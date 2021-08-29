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
                    props.errors[i.name][0] : props.errors[i.name].join()) :
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