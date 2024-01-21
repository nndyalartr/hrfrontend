import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import AppRoutes from './Routes/App.routes';
import { ConfigProvider, message } from 'antd';
import Cookies from 'js-cookie';
import axios from 'axios';
import { privateAxios } from './utils/AxiosUtils';
import { themeConfig } from './utils/AntdThemeConfig';

function App() {
  message.config({
    maxCount: 1
  })
  let userAuthRefreshToken = Cookies.get('_auth_refresh')
  const ref = async () => {

    await privateAxios({
      url: "/api/token/refresh/",
      method: "POST",
      data: { refresh: userAuthRefreshToken }
    }).then((response: any) => {
      Cookies.set("_auth", response.data.access)
      return {
        isSuccess: true,
        newAuthToken: response.data.access
      }
    }).catch((e: any) => {
      return {
        isSuccess: false
      }
    })
  }
  useEffect(() => {
    if (userAuthRefreshToken) {
      const intervalId = setInterval(() => {
        ref()
      }, 1000000);

      return () => clearInterval(intervalId);
    }

  }, []);
  return (
    <div className="App">
      <ConfigProvider
        theme={themeConfig}
      >
        <AppRoutes />
      </ConfigProvider>
    </div>
  );
}

export default App;
