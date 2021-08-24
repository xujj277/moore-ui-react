import React from 'react'
import './button.scss'
import classes from '../helpers/classes'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  theme?: 'button' | 'primary' | 'danger' | 'text' | 'link'
  size?: 'normal' | 'big' | 'small'
}

const Button: React.FunctionComponent<Props> = (props) => {
  const {className, children, theme, size, ...restProps} = props;
  return (
    <button className={classes('moore-button', 
      className, 
      `moore-theme-${theme}`,
      `moore-size-${size}`,
    )}
            {...restProps}
    >
      {children}
    </button>
  )
}
Button.defaultProps = {
  theme: 'button',
  size: 'normal'
}

export default Button