import React, { useState, useEffect, useMemo, Suspense } from "react";
import { Router } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { ConfigProvider, Spin } from "antd";
import intl from "react-intl-universal";
import { history } from "utils/tools";
import RouterFilter from "router/router-filter";

import { GlobalContextProvider } from "./context/globalContext";
import routes from "./router";
import zhCN from "antd/lib/locale/zh_CN";
import zh_CN from "./locales/zh_CN";
import moment from "moment";
import 'moment/locale/zh-cn';

import "antd/dist/antd.less";
import "./style/App.less";
import "./style/main-layout.less";

const locales = {
  zh_CN: zh_CN
};

function App() {
  const [lanInited, setLanInited] = useState(false);
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState([]);
  const [lang, setLang] = useState("zh_CN");

  const loadLang = (lan) => {
    intl
      .init({
        currentLocale: lan,
        locales
      })
      .then(() => {
        setLanInited(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadLang(lang);
    moment.locale('zh-cn');
  }, [lang]);

  // 使用useMemo方法避免无用方法的调用
  const globalStore = useMemo(
    () => ({
      menu,
      loading,
      setLoading,
      setMenu
    }),
    [menu, loading]
  );

  if (!lanInited) {
    return null;
  }

  return (
    <div className="App" id="app">
      <ConfigProvider locale={zhCN}>
        <GlobalContextProvider value={globalStore}>
          <Router basename={process.env.REACT_APP_BASENAME} history={history}>
            <Suspense
              fallback={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%"
                  }}
                >
                  <Spin size="large" />
                </div>
              }
            >
              <RouterFilter />
              {renderRoutes(routes, {
                menu: menu,
                mode: "horizontal"
              })}
            </Suspense>
          </Router>
        </GlobalContextProvider>
      </ConfigProvider>
    </div>
  );
}

export default App;
