import React, {useState} from 'react'
import Dialog, {openDialog} from './dialog'

export default function () {
  const [x, setX] = useState(false)
  return (
    <div>
      <h1>example 1</h1>
      <button onClick={() => setX(!x)}>click</button>
      <Dialog visible={x} 
              onClose={() => {setX(false)}}
              closeOnClickOverlay={true}
              buttons={
                [
                  <button onClick={() => setX(false)}>确定</button>,
                  <button onClick={() => setX(false)}>取消</button>
                ]
              }
      >
        我是内容
      </Dialog>
      <h1>example 2</h1>
      <button onClick={() => openDialog({})}>openDialog</button>
    </div>
  )
}