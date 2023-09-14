import { RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import NoAuthView from '@/views/NoAuthView.vue'
import ACCESS_ENUM from '@/access/accessEnum'
import UserLayout from '@/layouts/UserLayout.vue'
import UserLoginView from '@/views/user/UserLoginView.vue'
import UserRegisterView from '@/views/user/UserRegisterView.vue'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/user',
    name: '用户',
    component: UserLayout,
    meta: {
      hideInMenu: true,
    },
    children: [
      {
        path: '/user/login',
        name: '用户登录',
        component: UserLoginView,
      },
      {
        path: '/user/register',
        name: '用户注册',
        component: UserRegisterView,
      },
    ],
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      access: ACCESS_ENUM.NOT_LOGIN,
    },
  },
  {
    path: '/admin',
    name: '有权限',
    component: HomeView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
      hideInMenu: false,
    },
  },
  {
    path: '/noAuth',
    name: '无权限',
    component: NoAuthView,
    meta: {
      access: ACCESS_ENUM.NOT_LOGIN,
    },
  },
  {
    path: '/about',
    name: '关于我的',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/AboutView.vue'),
    meta: {
      access: ACCESS_ENUM.NOT_LOGIN,
    },
  },
]
