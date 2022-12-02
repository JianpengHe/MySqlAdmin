import React, { Suspense, lazy } from 'react'
import dayjs from 'dayjs'
import { Route, Routes, Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { LongContent } from '/test/LongContent'
import styled from 'styled-components'
import { IndexMenu } from './IndexMenu'
const { Header, Content, Sider } = Layout
dayjs.locale('zh-cn')
const Logo = styled.div`
  color: #fff;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  margin: 10px;
  > img {
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }
`
const App: React.FC = () => (
  <Layout style={{ height: '100vh', display: 'flex' }}>
    <Sider breakpoint="lg" collapsedWidth="0">
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Logo>
          <img src="profile_img.jpg" />
          <span>You Logo</span>
        </Logo>
        <IndexMenu />
      </div>
    </Sider>
    <Layout style={{ height: '100vh' }} className="scrollbar">
      <Header className="site-layout-sub-header-background" style={{ padding: 0 }}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={new Array(15).fill(null).map((_, index) => {
            const key = index + 1
            return {
              key,
              label: `nav ${key}`,
            }
          })}
        />
      </Header>
      <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
        <Link to="/t2">ttt</Link>
        <Routes>
          <Route path="/" element={<LongContent />} />
          <Route path="/t2" element={<>ttt</>} />
        </Routes>
      </Content>
    </Layout>
  </Layout>
)

export default App
