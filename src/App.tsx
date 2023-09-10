import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppRoutes from './Routes/App.routes';
import { ConfigProvider, message } from 'antd';

function App() {
  message.config({
    maxCount:1
  })
  return (
    <div className="App">
      <ConfigProvider >
        <AppRoutes />
      </ConfigProvider>
    </div>
  );
}

export default App;
