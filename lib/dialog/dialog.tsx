import React, { Fragment, ReactElement } from 'react'
import './dialog.scss';
import ReactDom from 'react-dom'
import scopedClassMaker from '../classes'
import {Icon} from '../index';

const sc = scopedClassMaker('moore-dialog')

interface Props {
  visible: boolean,
  onClose: React.MouseEventHandler,
  closeOnClickOverlay?: boolean,
  title?: ReactElement | string,
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
  console.log(props.buttons)
  const x = props.visible ? 
    <Fragment>
      <div className={sc('overlay')} onClick={onClickMask}></div>
      <div className={sc('wrapper')}>
        <div className={sc()}>
          <div className={sc('border')}>
            <header>
              {props.title}
              <Icon name="wechat" onClick={onClickClose}/>
            </header>
            <main>{props.children}</main>
            <footer>
              {props.buttons && props.buttons.map((item, index) => React.cloneElement(item, {key: index}))}
            </footer>
          </div>
        </div>
      </div>
    </Fragment> : null
  return (
      ReactDom.createPortal(x, document.body)
  )
}

Dialog.defaultProps = {
  closeOnClickOverlay: false,
  title: '标题'
};

export default Dialog
