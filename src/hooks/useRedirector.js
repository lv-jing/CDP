import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { GlobalContext } from 'context/globalContext';
import { MenuContext } from 'layout';

export default function useRedirector() {
  const { menu } = useContext(GlobalContext);
  const { setOpenKeys, setSelectedKeys } = useContext(MenuContext);
  const history = useHistory();
  const getSelectedKeysAndOpenKeys = (path) => {
    let key = path.split('/')[1]
    const parentMenu = menu.find(m => m.key === key);
    if (parentMenu && (!parentMenu.children || !parentMenu.children.length)) {
      return { openKeys: [], selectedKeys: [parentMenu.key] };
    }
    for(let i = 0; i < menu.length; i ++) {
      let childMenu = menu[i].children.find(m => m.path === path);
      if (childMenu) {
        return { openKeys: [menu[i].key], selectedKeys: [childMenu.key] };
      }
    }
    return { openKeys: [], selectedKeys: [] };
  };

  const redirector = {
    push: (path) => {
      const { openKeys, selectedKeys } = getSelectedKeysAndOpenKeys(path);
      // setOpenKeys(openKeys);
      setSelectedKeys(selectedKeys);
      history.push(path);
    }
  };

  return {
    redirector
  };
}
