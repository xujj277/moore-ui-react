import React, { MouseEventHandler, useEffect, useRef, useState } from 'react'
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
  const draggingRef = useRef(false)
  const firstYRef = useRef(0)
  const onMouseDownBar: MouseEventHandler = (e) => {
    draggingRef.current = true
    firstYRef.current = e.clientY
    console.log(e)
  }
  const onMouseUpBar = () => {
    draggingRef.current = false
    console.log(2)
  }
  const onMouseMoveBar = (e: MouseEvent) => {
    if (draggingRef.current) {
      const delta = e.clientY - firstYRef.current
      const newBarTop = barTop + delta
      setBarTop(newBarTop)
      const viewHeight = containerRef.current!.getBoundingClientRect().height
      const scrollHeight = containerRef.current!.scrollHeight
      containerRef.current!.scrollTop = scrollHeight * newBarTop / viewHeight
      console.log(3)
    }
  }
  const onSelect = (e: Event) => {
    if (draggingRef.current) { e.preventDefault() }
  }
  useEffect(() => {
    document.addEventListener('mouseup', onMouseUpBar)
    document.addEventListener('mousemove', onMouseMoveBar)
    document.addEventListener('selectstart', onSelect)

    return () => {
      document.removeEventListener('mouseup', onMouseUpBar)
      document.removeEventListener('mousemove', onMouseMoveBar)
      document.removeEventListener('selectstart', onSelect)
    }
  }, [])
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
             onMouseDown={onMouseDownBar}
        />
      </div>
    </div>
  )
}

export default Scroll