import React, { Fragment, useState } from 'react'
import Form from './form'

const FormExample: React.FunctionComponent = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [fields] = useState([
    {name: 'username', label: '用户名', input: {type: 'text'}},
    {name: 'password', label: '密码', input: {type: 'password'}},
  ])
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const rules = [
      {key: 'username', required: true},
      {key: 'username', minLength: 8, maxLength: 16},
      {key: 'username', pattern: /^[A-Za-z0-9]+$/},
      {key: 'password', required: true},
    ]
  }
  return (
    <div>
      <Form value={formData} 
            fields={fields} 
            buttons={
              <Fragment>
                <button type="submit">提交</button>
                <button>返回</button>
              </Fragment>
            }
            onChange={(newValue) => setFormData(newValue)}
            onSubmit={onSubmit}
      ></Form>
    </div>
  );
};

export default FormExample; 