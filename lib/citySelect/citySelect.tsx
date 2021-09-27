import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import './citySelect.scss'

interface Props {
  dataSource: string[];
  onChange: (value: string) => void;
}

interface Context {
  map: Object,
  onChange: (value: string) => void,
  setDialogVisible: Dispatch<SetStateAction<boolean>>
}

const CitySelectContent = React.createContext<Context>({
  map: {}, onChange: (value: string) => {}, setDialogVisible: () => {}
})

const CitySelect: React.FC<Props> = (props) => {
  const [dialogVisible, setDialogVisible] = useState(false)
  const map: Context['map'] = {}
  const onClick = () => {
    setDialogVisible(true)
  }
  return (
    <CitySelectContent.Provider value={{map, onChange: props.onChange, setDialogVisible}}>
      <div onClick={onClick}>{props.children}</div>
      {dialogVisible && <Dialog onClose={() => setDialogVisible(false)}></Dialog>}
    </CitySelectContent.Provider>
  )
}

const Dialog: React.FC<{ onClose: () => void } > = (props) => {
  return ReactDOM.createPortal((
    <div className="moore-citySelect-dialog">
      <header>
        <span className="icon" onClick={props.onClose}>&lt;</span>
        <span>选择城市</span>
      </header>
      <CurrentLocation/>
    </div>
  ), document.body)
}

const CurrentLocation: React.FC = () => {
  const [city, setCity] = useState<string>('加载中...')
  useEffect(() => {
    const xhr = new XMLHttpRequest()
    xhr.open('get', 'http://ip-api.com/json/?lang=zh-CN')
    xhr.onload = () => {
      const string = xhr.responseText
      console.log(1111, string)
    }
    xhr.onerror = () => {
      setCity('未知')
    }
    xhr.send();
  }, [])
  return (
    <div className="currentCity">
      当前城市：{city}
    </div>
  )
}

export default CitySelect