/*
 * TODO:
 * 1. 支持子字段编辑（子表单）
 * 2. 支持更多的 type / 自定义的 input
 * 3. 支持手机端
 */
import React, { ReactElement } from 'react'
import classes from '../helpers/classes'
import Input from '../input/input'
import './form.scss'

export interface FormValue {
  [K: string]: any
}

interface Props {
  value: FormValue
  fields: Array<{name: string, label: string, input: {type: string}}>
  buttons: ReactElement
  errors: {[K: string]: string[]}
  onSubmit: React.FormEventHandler<HTMLFormElement>
  onChange: (value: FormValue) => void
  errorsDisplayMode?: 'first' | 'all'
  transformError?: (message: string) => string
}

const Form: React.FunctionComponent<Props> = (props) => {
  const formData = props.value
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    props.onSubmit(e)
  }
  const onInputChange = (name: string, value: string) => {
    const newFormValue = {...formData, [name]: value}
    props.onChange(newFormValue)
  }
  const transformError = (message: string) => {
    const map: any = {
      required: '必填',
      minLength: '太短',
      maxLength: '太长',
    }
    return props.transformError && props.transformError(message) || map[message] || '未知错误'
  }
  return (
    <form onSubmit={onSubmit}>
      <table className="moore-form-table">
        <tbody>
        {props.fields.map(i =>
          <tr className={classes('moore-form-tr')} key={i.name}>
            <td className="moore-form-td">
              <span className="moore-form-label">{i.label}</span>
            </td>
            <td className="moore-form-td">
              <Input className="moore-form-input"
                     type={i.input.type}
                     value={formData[i.name]}
                     onChange={(e) => onInputChange(i.name, e.target.value)}
              />
              <div className="moore-form-error">{
                props.errors[i.name] ?
                  (props.errorsDisplayMode === 'first' ?
                    transformError!(props.errors[i.name][0]) : props.errors[i.name].map(transformError!).join()) :
                  <span>&nbsp;</span>
              } </div>
            </td>
          </tr>
        )}
        <tr className="moore-form-tr">
          <td className="moore-form-td"/>
          <td className="moore-form-td">
            {props.buttons}
          </td>
        </tr>
        </tbody>
      </table>
    </form>
  )
}

Form.defaultProps = {
  errorsDisplayMode: 'first'
};

export default Form