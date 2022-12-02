import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '/App'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import 'antd/dist/reset.css'
import '/index.less'
import { ConfigProvider } from 'antd'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') || document.body).render(
  // <React.StrictMode>
  <ConfigProvider locale={zhCN}>
    <Router>
      <App />
    </Router>
  </ConfigProvider>
  // </React.StrictMode>
)
