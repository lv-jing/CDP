import React, { useState, useRef } from 'react';
import { Dropdown, Menu, Input, message } from 'antd';
import { SearchOutlined, RightOutlined, LoadingOutlined, CloseOutlined } from '@ant-design/icons';
import VIcon from 'components/icon';
import useRedirector from 'hooks/useRedirector';
import memberIcon from 'assets/images/home/searchMember.png';
import groupIcon from 'assets/images/home/searchGroup.png';
import labelIcon from 'assets/images/home/searchLabel.png';
import { getSearchData } from 'api/home';
import Const from 'utils/Const';

export default function SearchBar() {
  const [showSearchSuggestion, setShowSearchSuggestion] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef(null);
  const { redirector } = useRedirector();
  const [searchValue, setSearchValue] = useState('')
  const [loading, setLoading] = useState(false);
  const [searchSuggestion, setSearchSuggestion] = useState(<Menu>
    <Menu.ItemGroup title="搜索中" disabled key="搜索中" />
  </Menu>)
  const handleClickTrigger = () => {
    setShowInput(true);
    inputRef.current.focus({
      cursor: 'end',
    });
  };
  const onInputBlur = () => {
    setShowInput(false)
    setSearchValue('')
    setShowSearchSuggestion(false)
  }
  const handleClickSearchSuggestion = ({ key }) => {
    setShowInput(false)
    setSearchValue('')
    setShowSearchSuggestion(false);
    redirector.push(key);
  };

  const getPath = (type, id) => {
    switch (type) {
      case "1": //会员
        return `/one-insight/detail/${id}`
      case "2": //标签
        return `/label/list?id=${id}`
      case "3": //客群
        return `/many-insight/detail/${id}`
      default:
        break;
    }
  }

  const getIcon = (type) => {
    switch (type) {
      case "1": //会员
        return memberIcon
      case "2": //标签
        return labelIcon
      case "3": //客群
        return groupIcon
      default:
        break;
    }
  }

  const handleSearch = () => {
    if (searchValue) {
      setLoading(true)
      setSearchSuggestion(<Menu>
        <Menu.ItemGroup title="搜索中" disabled key="搜索中" />
      </Menu>)
      getSearchData({ name: searchValue }).then(res => {
        if (res.code === Const.SUCCESS_CODE) {
          let searchResult =
            <Menu className="head-dropdown-menu" onClick={handleClickSearchSuggestion}>
              {
                res.data.length > 0 ? res.data.map(item => (
                  <Menu.Item key={getPath(item.type, item.id)}>
                    <span className="flex align-center">
                      {/* <VIcon type="icon-btn-product" style={{ fontSize: 18 }} /> */}
                      <img style={{ height: 30 }} src={getIcon(item.type)} alt={item.type} />
                      <span className="flex-item flex-main">{item.name}</span>
                      <RightOutlined className="word small tip" />
                    </span>
                  </Menu.Item>
                )) : <Menu>
                  <Menu.ItemGroup title="没有数据" disabled key="没有数据" />
                </Menu>
              }
            </Menu>
          setSearchSuggestion(searchResult)
          setLoading(false)
        }
      })
      setShowSearchSuggestion(true);
    } else {
      setShowSearchSuggestion(false);
    }
  };

  return (
    <div className={`search-bar-container ${showInput ? 'show' : ''}`}>
      <div className="search-bar-trigger" onClick={handleClickTrigger}>
        {!showInput ? <SearchOutlined style={{ fontSize: 18 }} /> : null}
      </div>
      <div className="search-bar-input">
        <Dropdown overlay={searchSuggestion} placement="bottomCenter" visible={showSearchSuggestion}>
          <Input ref={inputRef} value={searchValue}
            placeholder='点击回车搜索' suffix={
              loading ? (
                <LoadingOutlined style={{ color: '#dcdcdc' }} />
              ) : (
                <CloseOutlined style={{ color: '#dcdcdc' }} onClick={() => onInputBlur()} />
              )}
            onChange={(e) => setSearchValue(e.target.value)}
            onPressEnter={() => handleSearch()}
          />
        </Dropdown>
      </div>
    </div>
  );
}
