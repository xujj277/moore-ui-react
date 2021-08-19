import React from 'react'
import Layout from './layout'
import Aside from './aside'
import Header from './header'
import Content from './content'
import Footer from './footer'

export default function () {
  return (
    <div>
      <h1>第四个例子</h1>
      <Layout style={{height: 500}} className="hi">
        <Aside>aside</Aside>
        <Layout>
          <Header>header</Header>
          <Content>content</Content>
          <Footer>footer</Footer>
        </Layout>
      </Layout>
    </div>
  )
}