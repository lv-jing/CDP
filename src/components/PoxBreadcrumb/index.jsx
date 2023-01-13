import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import storageKey from 'utils/storageKey';
import intl from 'react-intl-universal';

/** 所有参数都为可选参数
 * autoLevel 自动显示层级 默认为三层且最多为三层,超过三层后面的层级由页面处理，作为children传递 number;
 * children 后续层级 any;
 * first 自定义第一层显示文本 string;
 * second 自定义第二层显示文本 string;
 * third 自定义第三层显示文本 string;
 * thirdLevel 第三层是否自动显示 boolean;
 */
export default function PoxBreadCrumb(props){
//选中的一级菜单索引
const firstIndex = sessionStorage.getItem(storageKey.FIRST_ACTIVE) || '0';
//选中的二级菜单索引
const secondIndex = sessionStorage.getItem(storageKey.SECOND_ACTIVE) || '0';
//选中的三级菜单索引
const thirdIndex = sessionStorage.getItem(storageKey.THIRD_ACTIVE) || '0';
//所有菜单
const allGradeMenus = JSON.parse(sessionStorage.getItem(storageKey.LOGIN_MENUS));

let first = props.frist || allGradeMenus.firstIndex.title;
let firstUrl = ''
let second = allGradeMenus.getIn([firstIndex, 'children']) ? (allGradeMenus.get(firstIndex).get('children').get(secondIndex).get('title') || '') : '';
let third = second ? (allGradeMenus.get(firstIndex).get('children').get(secondIndex).get('children').get(thirdIndex).get('title') || '') : '';
let thirdUrl = third ? (allGradeMenus.getIn([firstIndex, 'children', secondIndex, 'children', thirdIndex, 'url']) || '') : '';

const firstMenuName = first ? intl.get(`Menu.${first}`) : first;
const thirdMenuName = third ? intl.get(`Menu.${third}`) : third;

return (
  <Breadcrumb>
    {first !== '' && <Breadcrumb.Item>
      <Link to={firstUrl}>{firstMenuName}</Link>
    </Breadcrumb.Item>}
    {third !== '' && <Breadcrumb.Item>{this.props.thirdLevel ? <Link to={thirdUrl}>{thirdMenuName}</Link> : thirdMenuName}</Breadcrumb.Item>}
    {this.props.children}
  </Breadcrumb>
)
}  