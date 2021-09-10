import React, {useState} from 'react'
import Dialog, {openDialog} from './dialog'
import Button from '../button/button'

export default function () {
  const [x, setX] = useState(false)
  return (
    <div>
      <h1>example 1</h1>
      <Button onClick={() => setX(!x)}>click</Button>
      <Dialog visible={x} 
              onClose={() => {setX(false)}}
              closeOnClickOverlay={true}
              buttons={
                [
                  <Button onClick={() => setX(false)}>确定</Button>,
                  <Button onClick={() => setX(false)}>取消</Button>
                ]
              }
      >
        我是内容
      </Dialog>
      <h1>example 2</h1>
      <Button onClick={() => openDialog({content: '123123', afterClose: () => {
          console.log(111)
        }})}>openDialog</Button>
    </div>
  )
}