import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import './citySelect.scss'
import pinyin from 'tiny-pinyin';

interface Props {
  dataSource: string[]
  onChange: (value: string) => void
}

interface Context {
  map: {[key: string]: string[]}
  onChange: (value: string) => void
  setDialogVisible: Dispatch<SetStateAction<boolean>>
}

const CitySelectContext = React.createContext<Context>({
  map: {}, onChange: (value: string) => {}, setDialogVisible: () => {}
})

const CitySelect: React.FC<Props> = (props) => {
  const [dialogVisible, setDialogVisible] = useState(false)
  const map: Context['map'] = {}
  props.dataSource.map(city => {
    const py = pinyin.convertToPinyin(city)
    const index = py[0]
    if (!map[index]) {
      map[index] = []
    }
    map[index].push(city)
  })
  return (
    <CitySelectContext.Provider value={{map, onChange: props.onChange, setDialogVisible}}>
      <div onClick={() => setDialogVisible(true)}>{props.children}</div>
      {dialogVisible && <Dialog onClose={() => setDialogVisible(false)}></Dialog>}
    </CitySelectContext.Provider>
  )
}

const Dialog: React.FC<{ onClose: () => void } > = (props) => {
  const {map, onChange} = useContext(CitySelectContext)
  const cityList = Object.entries(map).sort((a, b) => a[0].charCodeAt(0) - b[0].charCodeAt(0))
  const indexList = Object.keys(map).sort();
  const onClick = (city: string) => {
    onChange(city)
  }
  return ReactDOM.createPortal((
    <div className="moore-citySelect-dialog">
      <header>
        <span className="icon" onClick={props.onClose}>&lt;</span>
        <span>选择城市</span>
      </header>
      <CurrentLocation/>
      <h2>全部城市</h2>
      <ol className="moore-citySelect-index">
        {indexList.map(a => <li key={a}>{a}</li>)}
      </ol>
      <div className="cityList">所有城市</div>
      {cityList.map(([letter, list]) => {
        return (
          <div key={letter} className="moore-citySelect-citySection">
            <h4 data-letter={letter}>{letter}</h4>
            {list.map(city =>
              <div className="moore-citySelect-cityName" key={city}
                   onClick={() => onClick(city)}
              >
                {city}
              </div>
            )}
          </div>
        )
      })}
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
      const obj = JSON.parse(string)
      setCity(obj.city)
    }
    xhr.onerror = () => {
      setCity('未知')
    }
    xhr.send()
  }, [])
  return (
    <div className="currentCity">
      当前城市：{city}
    </div>
  )
}

export default CitySelect