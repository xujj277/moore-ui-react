import React from 'react';
import Button from './button'

const ButtonExample: React.FunctionComponent = () => {
  return (
    <div>
      <div>
        <h1>基本用法</h1>
        <Button>领取</Button>
        <Button theme="primary">目标追踪</Button>
        <Button theme="danger">取消追踪</Button>
      </div>
      <div>
        <h1>文字按钮</h1>
        <Button theme="text">文字</Button>
        <Button theme="link">链接</Button>
      </div>
      <div>
        <h1>不同尺寸</h1>
        <Button size="big">大按钮</Button>
        <Button>普通按钮</Button>
        <Button size="small">小按钮</Button>
      </div>
      <div>
        <h1>禁用按钮</h1>
        <Button disabled>领取</Button>
        <Button theme="link" disabled>链接禁止按钮</Button>
        <Button theme="text" disabled>文字禁止按钮</Button>
        <Button theme="danger" disabled>目标追踪</Button>
        <Button theme="primary" disabled>取消追踪</Button>
      </div>
    </div>
  );
};

export default ButtonExample; 