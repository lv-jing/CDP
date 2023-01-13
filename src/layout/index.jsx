import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { renderRoutes } from "react-router-config";
import TopMenu from './components/top-menu';

//import VerticalLayout from './layout-main';
import HorizontalLayout from './layout-hoz';
import { getMenus } from 'api/menu';
import { getTreeData } from 'utils/Tree';
import Const from 'utils/Const';
import { GlobalContext } from "context/globalContext";


export const MenuContext = React.createContext();

function AppLayout({ mode, route }) {
  console.log(route);
  const history = useHistory();
  const location = useLocation();
  const [menus, setMenus] = useState([])
  const [selectedKeys, setSelectedKeys] = useState(['home']);
  const { setMenu } = useContext(GlobalContext);


  //获取当前选中的menu key
  function getSelectedKeyByPath(path, menu) {
    let result = '';
    for (let i = 0, len = menu.length; i < len; i++) {
      let pathList = path ? path.split('/') : []
      let firstPath = path.length > 1 ? pathList[1] : ''
      if (menu[i].key === firstPath) {
        result = menu[i].key;
        break;
      } else if (menu[i].children) {
        result = getSelectedKeyByPath(path, menu[i].children);
      }
    }
    return result;
  }

  useEffect(() => {
    if (!localStorage.getItem('menus')) {
      getMenus().then(res => {
        if (res.code === Const.SUCCESS_CODE) {
          let treeList = res.data.map(m => {
            return {
              id: m.menuId,
              parentId: m.parentId,
              path: m.path,
              sort: m.orderNum,
              key: m.component,
              title: m.menuName
            }
          })
          setMenu(treeList)
          localStorage.setItem('menus-list', JSON.stringify(treeList))

          let treeData = getTreeData(treeList)
          localStorage.setItem('menus', JSON.stringify(treeData))
          setMenus(treeData)
        }
      })
    } else {
      setMenu(JSON.parse(localStorage.getItem('menus-list')))
      setMenus(JSON.parse(localStorage.getItem('menus')))
    }
  }, [setMenu])


  useEffect(() => {
    if (!localStorage.getItem('token')) {
      history.push('/login');
    } else {
      const selectedTopKey = getSelectedKeyByPath(location.pathname, menus);
      setSelectedKeys([selectedTopKey]);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, menus]);

  const menuStore = {
    setSelectedKeys
  };

  return (
    <MenuContext.Provider value={menuStore}>
      <HorizontalLayout
        menu={<TopMenu selectedKeys={selectedKeys} setSelectedKeys={setSelectedKeys} menus={menus} />}
      >
        {renderRoutes(route.routes)}
      </HorizontalLayout>
    </MenuContext.Provider>
  );
}


export default AppLayout;
