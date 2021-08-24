import React, { ReactElement } from 'react'

interface Props {
  value: {[K: string]: any}
  fields: Array<{name: string, label: string, input: {type: string}}>
  buttons: ReactElement
}

const Form: React.FunctionComponent<Props> = (props) => {
  return (
    <form>
      {props.fields.map(i => 
        <div key={i.name}>
          {i.label}
          <input type={i.input.type}/>
        </div>
      )}
      <div>
        {props.buttons}
      </div>
    </form>
  )
}

export default Form