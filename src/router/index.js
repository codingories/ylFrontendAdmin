import Home from '../views/Home.vue'
import {createRouter, createWebHashHistory} from "vue-router"

const routes = [
  {
    name: 'home',
    path: '/',
    // 元信息，方便修改标题等操作。也可以用来做权限
    meta: {
      title: '首页'
    },
    component: Home,
    redirect: '/welcome',
    children: [
      {
        name: 'welcome',
        path: '/welcome',
        meta: {
          title: '欢迎页'
        },
        component: () => import('../views/Welcome.vue'),
      },
    ]
  },
  {
    name: 'login',
    path: '/login',
    meta: {
      title: '登录'
    },
    component: () => import('../views/Login.vue'),
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

export default router;
