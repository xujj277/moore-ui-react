import React, { Fragment, ReactElement, ReactNode } from 'react'
import './dialog.scss';
import ReactDOM from 'react-dom'
import scopedClassMaker from '../classes'
import {Icon} from '../index';

const sc = scopedClassMaker('moore-dialog')

interface Props {
  visible: boolean,
  onClose: React.MouseEventHandler,
  closeOnClickOverlay?: boolean,
  title?: ReactNode
  buttons?: Array<ReactElement>
}

const Dialog: React.FunctionComponent<Props> = (props) => {
  const onClickClose: React.MouseEventHandler = (e) => {
    props.onClose(e)
  }
  const onClickMask: React.MouseEventHandler = (e) => {
    if (props.closeOnClickOverlay) {
      props.onClose(e)
    }
  }
  const result = props.visible && 
    <Fragment>
      <div className={sc('overlay')} onClick={onClickMask}></div>
      <div className={sc('wrapper')}>
        <div className={sc()}>
          <div className={sc('border')}>
            <header>
              {props.title}
              <Icon name="wechat" onClick={onClickClose}/>
            </header>
            <main>{props.children || '内容'}</main>
            {props.buttons && props.buttons.length > 0 &&
              <footer>
                {props.buttons && props.buttons.map((item, index) => React.cloneElement(item, {key: index}))}
              </footer>
            }
          </div>
        </div>
      </div>
    </Fragment>
  return (
      ReactDOM.createPortal(result, document.body)
  )
}

Dialog.defaultProps = {
  closeOnClickOverlay: false,
  title: '标题'
};

const openDialog = (options: {
  closeOnClickOverlay?: boolean, 
  buttons?: Array<ReactElement>, 
  title?: ReactNode,
  content?: ReactNode,
  afterClose?: () => void
}) => {
  const {closeOnClickOverlay, buttons, title, content, afterClose} = options
  const close = () => {
    ReactDOM.render(React.cloneElement(component,{visible: false}), div)
    ReactDOM.unmountComponentAtNode(div)
    div.remove()
  }
  const component = <Dialog visible={true}
                            closeOnClickOverlay={closeOnClickOverlay}
                            buttons={buttons}
                            title={title}
                            onClose={() => {
                              close()
                              afterClose && afterClose()
                            }}>
    {content}
  </Dialog>
  const div = document.createElement('div')
  document.body.append(div)
  ReactDOM.render(component, div)
}

export {openDialog}

export default Dialog
