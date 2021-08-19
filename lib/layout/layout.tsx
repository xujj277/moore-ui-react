import React, { ReactElement } from 'react'
import './layout.scss';
import Aside from './aside'
import { scopedClassMaker } from '../helpers/classes'

interface Props extends React.HTMLAttributes<HTMLElement>{
  children: ReactElement | Array<ReactElement>
}
const sc = scopedClassMaker('moore-layout')

const Layout: React.FunctionComponent<Props> = (props) => {
  const {className, ...restProps} = props
  const children = props.children as Array<ReactElement>
  const hasAside = children.some(i => i.type === Aside)
  return (
    <div className={sc({'': true, hasAside}, {extra: className})} {...restProps}>
      {props.children}
    </div>
  )
}

export default Layout