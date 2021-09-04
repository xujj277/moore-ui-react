import { FormValue } from './form'

interface FormRule {
  key: string
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  validator?: (value: string) => Promise<string>
}

type FormRules = Array<FormRule>

function isEmpty (value: any) {
  return value === 'undefined' || value === null || value === ''
}

export function noError (errors: any) {
  return Object.keys(errors).length === 0
}

type OneError = string | Promise<string>;

const Validator = (formValue: FormValue, rules: FormRules, callback: (errors: any) => void): void => {
  let errors: { [key: string]: OneError[] } = {}
  const addErrors = (key: string, error: OneError) => {
    if (errors[key] === undefined) {
      errors[key] = []
    }
    errors[key].push(error)
  }
  rules.map(rule => {
    const value = formValue[rule.key]
    if (rule.validator) {
      const promise = rule.validator(value)
      addErrors(rule.key, promise)
    }
    if (rule.required && isEmpty(value)) {
      addErrors(rule.key, 'required')
    }
    if (rule.minLength && !isEmpty(value) && value!.length < rule.minLength) {
      addErrors(rule.key, 'minLength')
    }
    if (rule.maxLength && !isEmpty(value) && value!.length > rule.maxLength) {
      addErrors(rule.key, 'maxLength')
    }
    if (rule.pattern && !(rule.pattern.test(value))) {
      addErrors(rule.key, 'pattern')
    }
  })

  function hasError (item: [string, undefined] | [string, string]): item is [string, string] {
    return typeof item[1] === 'string' 
  }
  
  const flattenErrors = flat(Object.keys(errors).map(
    key => errors[key].map<[string, OneError]>(error => [key, error])
  ))
  
  const newPromises = flattenErrors.map(
    ([key, promiseOrString]) => {
      const promise = promiseOrString instanceof Promise ? promiseOrString : Promise.reject(promiseOrString)
      return promise.then<[string, undefined], [string, string]>(() => [key, undefined], (reason) => [key, reason])
    }
  )
  
  Promise.all(newPromises).then(results => {
    callback(zip(results.filter<[string, string]>(hasError)))
  })
}

function flat<T> (array: Array<T | T[]>) {
  let result: T[] = []
  for (let i = 0; i < array.length; i++) {
    if (array[i] instanceof Array) {
      result.push(...array[i] as T[])
    } else {
      result.push(array[i] as T)
    }
  }
  return result
}

function zip (arr: Array<[string, string]>) {
  let result: { [key: string]: string[] } = {}
  arr.map(([key, value]) => {
    result[key] = result[key] || []
    result[key].push(value)
  })
  return result
}

export default Validator