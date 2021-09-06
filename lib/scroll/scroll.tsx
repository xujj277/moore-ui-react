import React from 'react'
import scrollbarWidth from './scrollbar-width'

interface Props extends React.HTMLAttributes<HTMLElement>{}

const Scroll: React.FunctionComponent<Props> = (props) => {
  const {children, ...restProps} = props
  return (
    <div className={'moore-scroll'} {...restProps}>
      <div className={'moore-scroll-inner'}  style={{right: -scrollbarWidth()}}>
        {children}
      </div>
    </div>
  )
}

export default Scroll