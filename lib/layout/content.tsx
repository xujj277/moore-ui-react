import React from 'react'
import { scopedClassMaker } from '../helpers/classes'

interface Props extends React.HTMLAttributes<HTMLElement>{}
const sc = scopedClassMaker('moore-layout')

const Content: React.FunctionComponent<Props> = (props) => {
  const {className, ...restProps} = props
  return (
    <div className={sc('content', {extra: className})} {...restProps}>
      {props.children}
    </div>
  )
}

export default Content