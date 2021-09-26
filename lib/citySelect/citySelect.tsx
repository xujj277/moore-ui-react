import React, { Dispatch, SetStateAction, useState } from 'react'
import './citySelect.scss'

interface Props {
  dataSource: string[];
  onChange: (p1: string) => void;
}

interface Context {
  map: Object,
  onChange: () => void,
  setDialogVisible: Dispatch<SetStateAction<boolean>>
}

const CitySelectContent = React.createContext<Context>({
  map: {}, onChange: () => {}, setDialogVisible: () => {}
})

const CitySelect: React.FC<Props> = (props) => {
  const [dialogVisible, setDialogVisible] = useState(false)
  const map: Context['map'] = {}
  const onClick = () => {
    setDialogVisible(true)
  }
  return (
    <CitySelectContent.Provider value={{map, onChange: () => {}, setDialogVisible}}>
      <div onClick={onClick}>{props.children}</div>
      {dialogVisible && <Dialog></Dialog>}
    </CitySelectContent.Provider>
  )
}

const Dialog: React.FC = () => {
  return (
    <div>1</div>
  )
}

export default CitySelect