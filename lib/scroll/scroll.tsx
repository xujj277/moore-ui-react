import React, { useEffect, useRef, useState } from 'react'
import scrollbarWidth from './scrollbar-width'
import './scroll.scss'

interface Props extends React.HTMLAttributes<HTMLElement> {}

const Scroll: React.FunctionComponent<Props> = (props) => {
  const {children, ...restProps} = props
  const [barHeight, setBarHeight] = useState(0)
  const [barTop, setBarTop] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const viewHeight = containerRef.current!.getBoundingClientRect().height
    const scrollHeight = containerRef.current!.scrollHeight
    setBarHeight(viewHeight * viewHeight / scrollHeight)
  }, [])
  const onScroll = () => {
    const {current} = containerRef
    const viewHeight = current!.getBoundingClientRect().height
    const scrollHeight = current!.scrollHeight
    const scrollTop = current!.scrollTop
    setBarTop(scrollTop * viewHeight / scrollHeight)
  }
  return (
    <div className={'moore-scroll'} {...restProps}>
      <div className={'moore-scroll-inner'} style={{right: -scrollbarWidth()}}
           ref={containerRef}
           onScroll={onScroll}
      >
        {children}
      </div>
      <div className={'moore-scroll-track'}>
        <div className={'moore-scroll-bar'}
             style={{height: barHeight, transform: `translateY(${barTop}px)`}}
        />
      </div>
    </div>
  )
}

export default Scroll