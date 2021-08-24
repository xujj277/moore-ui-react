import React from 'react'
import './input.scss'
import classes from '../helpers/classes'

interface Props extends React.InputHTMLAttributes<HTMLInputElement>{
}

const Input: React.FunctionComponent<Props> = (props) => {
  const {className, children, ...restProps} = props;
  return (
    <div className={'moore-wrapper'}>
      <input className={classes('moore-input', className)} {...restProps}/>
    </div>
  )
}

export default Input