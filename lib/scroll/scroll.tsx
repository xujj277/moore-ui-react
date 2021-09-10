import React, {
  MouseEventHandler,
  TouchEventHandler,
  UIEventHandler,
  useEffect,
  useRef,
  useState
} from 'react'
import scrollbarWidth from './scrollbar-width'
import './scroll.scss'

interface Props extends React.HTMLAttributes<HTMLElement> {
  onPull?: () => void
}

const Scroll: React.FunctionComponent<Props> = (props) => {
  const {children, onPull, ...restProps} = props
  const [barHeight, setBarHeight] = useState(0)
  const [barTop, _setBarTop] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [barVisible, setBarVisible] = useState(false)
  const [translateY, setTranslateY] = useState(0)
  useEffect(() => {
    const viewHeight = containerRef.current!.getBoundingClientRect().height
    const scrollHeight = containerRef.current!.scrollHeight
    setBarHeight(viewHeight * viewHeight / scrollHeight)
  }, [])
  const setBarTop = (number: number) => {
    if (number < 0) return
    const {current} = containerRef
    const viewHeight = current!.getBoundingClientRect().height
    const scrollHeight = current!.scrollHeight
    const maxBarTop = (scrollHeight - viewHeight) * viewHeight / scrollHeight
    if (number > maxBarTop) return
    _setBarTop(number)
  }
  const timerIdRef = useRef<number | null>(null)
  const onScroll: UIEventHandler = () => {
    setBarVisible(true)
    const {current} = containerRef
    const viewHeight = current!.getBoundingClientRect().height
    const scrollHeight = current!.scrollHeight
    const scrollTop = current!.scrollTop
    setBarTop(scrollTop * viewHeight / scrollHeight)
    if (timerIdRef.current !== null) {
      window.clearTimeout(timerIdRef.current)
    }
    timerIdRef.current = window.setTimeout(() => {
      setBarVisible(false)
    }, 1000)
  }
  const draggingRef = useRef(false)
  const firstYRef = useRef(0)
  const onMouseDownBar: MouseEventHandler = (e) => {
    draggingRef.current = true
    firstYRef.current = e.clientY
  }
  const onMouseUpBar = () => {
    draggingRef.current = false
  }
  const onMouseMoveBar = (e: MouseEvent) => {
    if (draggingRef.current) {
      const delta = e.clientY - firstYRef.current
      const newBarTop = barTop + delta
      setBarTop(newBarTop)
      const viewHeight = containerRef.current!.getBoundingClientRect().height
      const scrollHeight = containerRef.current!.scrollHeight
      containerRef.current!.scrollTop = scrollHeight * newBarTop / viewHeight
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
  const lastYRef = useRef(0)
  const pulling = useRef(false)
  // const moveCount = useRef(0) // 这个到底有什么用？？？
  const onTouchStart: TouchEventHandler = (e) => {
    const scrollTop = containerRef.current!.scrollTop
    console.log(scrollTop)
    if (scrollTop !== 0) return
    pulling.current = true
    lastYRef.current = e.touches[0].clientY
    // moveCount.current = 0
  }
  const onTouchMove: TouchEventHandler = (e) => {
    const delta = e.touches[0].clientY - lastYRef.current
    // moveCount.current += 1
    // if (moveCount.current === 1 && delta < 0) { // 表示是往下拖拽
    if (delta < 0) {
      pulling.current = false
      return
    }
    if (!pulling.current) {return}
    setTranslateY(translateY + delta)
    lastYRef.current = e.touches[0].clientY
    console.log(2)
  }
  const onTouchEnd: TouchEventHandler = (e) => {
    if (pulling.current) {
      setTranslateY(0)
      onPull && onPull();
      pulling.current = false;
    }
  }
  return (
    <div className={'moore-scroll'} {...restProps} {...onPull}>
      <div className={'moore-scroll-inner'}
           style={{right: -scrollbarWidth(), transform: `translateY(${translateY}px)`}}
           ref={containerRef}
           onScroll={onScroll}
           onTouchStart={onTouchStart}
           onTouchMove={onTouchMove}
           onTouchEnd={onTouchEnd}
      >
        {children}
      </div>
      {barVisible &&
      <div className={'moore-scroll-track'}>
        <div className={'moore-scroll-bar'}
             style={{height: barHeight, transform: `translateY(${barTop}px)`}}
             onMouseDown={onMouseDownBar}
        />
      </div>
      }
      <div className="moore-scroll-pulling" style={{height: translateY}}>
        {translateY === 150 ?
          <span className="moore-scroll-pulling-text">释放手指即可更新</span> :
          <span className="moore-scroll-pulling-icon">↓</span>}
      </div>
    </div>
  )
}

export default Scroll