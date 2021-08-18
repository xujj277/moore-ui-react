import React, {useState} from 'react'
import Dialog from './dialog'

export default function () {
  const [x, setX] = useState(false)
  return (
    <div>
      <button onClick={() => setX(!x)}>click</button>
      <Dialog visible={x} 
              onClose={() => {setX(false)}}
              closeOnClickOverlay={true}
              title={
                <strong>hiasdfasdf</strong>
              }
              buttons={
                [
                  <button>确定</button>,
                  <button>取消</button>
                ]
              }
      >
        我是内容
      </Dialog>
    </div>
  )
}