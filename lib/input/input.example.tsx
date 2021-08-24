import React from 'react';
import Input from './input'

const InputExample: React.FunctionComponent = () => {
  const exampleFunction = (e: any) => {
    console.log(e.target.value)
  }
  return (
    <div>
      <div>
        <h1>基本用法</h1>
        <Input placeholder="Basic usage"></Input>
      </div>
      <div>
        <h1>禁用状态</h1>
        <Input placeholder="点击输入米米号" disabled></Input>
      </div>
      <div>
        <h1>Input 事件</h1>
        <Input placeholder="点击输入米米号" 
               onChange={(e) => exampleFunction(e)} 
               onInput={(e) => exampleFunction(e)}
               onFocus={(e) => exampleFunction(e)} 
               onBlur={(e) => exampleFunction(e)}
        ></Input>
      </div>
    </div>
  );
};

export default InputExample; 