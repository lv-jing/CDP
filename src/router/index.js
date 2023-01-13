import React, {lazy, Suspense} from 'react';
import { Redirect} from 'react-router-dom'

import Component404 from '../components/component404';
import CustomizeSkeleton from '../components/skeleton';

const SuspenseComponent = Component => props => {
  return (
      <Suspense fallback={<CustomizeSkeleton />}>
        <Component {...props}/>
      </Suspense>
  )
}

/******************
 * Layout 路由
 * ***************/
const AppLayout = lazy(()=> import('../layout/index.jsx'));

/*************
 * Page 路由
 *************/

// home
const Home = lazy(() => import('../pages/home'));

//one Insight
const oneInsight = lazy(() => import('../pages/one-insight/list'));
const oneInsightDetail = lazy(() => import('../pages/one-insight/detail'));

//many Insight
const mangInsight = lazy(() => import('../pages/many-insight/index'));
const mangInsightDetail = lazy(() => import('../pages/many-insight/detail'));
const mangInsightEdit = lazy(() => import('../pages/many-insight/edit'));

//lable
const lable = lazy(() => import('../pages/lable/index'));
const lableDeatail = lazy(() => import('../pages/lable/detail'));
const lableCreate = lazy(() => import('../pages/lable/create'));
//system
const dictionary = lazy(() => import('../pages/system/dictionary/index'));
const dictionaryCreate = lazy(() => import('../pages/system/dictionary/create'));

const mainData = lazy(() => import('../pages/system/data/index'));

const user = lazy(() => import('../pages/system/group/user/user'));
const department = lazy(() => import('../pages/system/group/department/department'));
const role = lazy(() => import('../pages/system/group/role/role'));

const routes = [
  {
    path:'/',
    exact: true,
    render:()=>{
      return <Redirect to={'/home'}/>
    }
  },
  {
    path: '/login',
    component: lazy(() => import('pages/login/login')),
  },
  {
    path: '/register',
    component: lazy(() => import('pages/login/register')),
  },
  {
    path: '/forget-password',
    component: lazy(() => import('pages/login/forget-password')),
  },
  {
    path: '/reset-password',
    component: lazy(() => import('pages/login/reset-password')),
  },
  {
    path: '/',
    component: AppLayout,
    routes: [
      {
        path: '/home',
        exact: true,
        component: SuspenseComponent(Home),
      },
      {
        path: '/one-insight/list',
        component: SuspenseComponent(oneInsight),
      },
      {
        path: '/one-insight/detail/:id',
        component: SuspenseComponent(oneInsightDetail),
      },
      {
        path: '/many-insight/list',
        component: SuspenseComponent(mangInsight)
      },
      {
        path: '/many-insight/detail/:id',
        component: SuspenseComponent(mangInsightDetail),
      },
      {
        path: '/many-insight/create',
        component: SuspenseComponent(mangInsightEdit),
      },
      {
        path: '/many-insight/edit/:id',
        component: SuspenseComponent(mangInsightEdit),
      },
      {
        path: '/label/list',
        component: SuspenseComponent(lable)
      },
      {
        path: '/label/detail/:id',
        component: SuspenseComponent(lableDeatail)
      },
      {
        path: '/label/create',
        component: SuspenseComponent(lableCreate)
      },
      {
        path: '/label/edit/:id',
        component: SuspenseComponent(lableCreate)
      },
      {
        path: '/system/dictionary',
        component: SuspenseComponent(dictionary)
      },
      {
        path: '/system/create',
        component: SuspenseComponent(dictionaryCreate)
      },
      {
        path: '/system/edit/:id',
        component: SuspenseComponent(dictionaryCreate)
      },
      {
        path: '/system/mainData',
        component: SuspenseComponent(mainData)
      },
      {
        path: '/system/user',
        component: SuspenseComponent(user)
      },
      {
        path: '/system/department',
        component: SuspenseComponent(department)
      },
      {
        path: '/system/role',
        component: SuspenseComponent(role)
      }
    ]
  },
  {
    component: Component404
  }
];

export default routes;
