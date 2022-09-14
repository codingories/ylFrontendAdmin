import Home from '@/views/Home.vue'
import {createRouter, createWebHashHistory} from "vue-router"
import storage from "../utils/storage.js"
import API from "../api/index.js"
import utils from "../utils/utils"
const modules = import.meta.glob('../views/*.vue')

const routes = [
  // {
  //   name: 'main',
  //   path: '/',
  //   meta: {
  //     title: '登录'
  //   },
  //   component: () => import('@/views/Login.vue'),
  // },
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
        path: 'welcome',
        meta: {
          title: '欢迎页'
        },
        component: () => import('@/views/Welcome.vue'),
      },
      // {
      //   name: 'user',
      //   path: '/system/user',
      //   meta: {
      //     title: '用户管理'
      //   },
      //   component: () => import('@/views/User.vue'),
      // },
      // {
      //   name: 'menu',
      //   path: '/system/menu',
      //   meta: {
      //     title: '菜单管理'
      //   },
      //   component: () => import('@/views/Menu.vue'),
      // },
      // {
      //   name: 'role',
      //   path: '/system/role',
      //   meta: {
      //     title: '角色管理'
      //   },
      //   component: () => import('@/views/Role.vue'),
      // },
      // {
      //   name: 'dept',
      //   path: '/system/dept',
      //   meta: {
      //     title: '角色管理'
      //   },
      //   component: () => import('@/views/Dept.vue'),
      // },
    ]
  },
  {
    name: 'login',
    path: '/login',
    meta: {
      title: '登录'
    },
    component: () => import('@/views/Login.vue'),
  },
  {
    name: '404',
    path: '/404',
    meta: {
      title: '页面不存在'
    },
    component: () => import('@/views/404.vue'),
  },

]


const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

// router.addRoute("home",
//   {
//     name: 'role',
//     path: '/system/role',
//     meta: {
//       title: '角色管理'
//     },
//     component: () => import('@/views/Role.vue'),
//   }
// )

async function loadAsyncRoutes() {
  let userInfo = storage.getItem("userInfo") || {}
  if (userInfo.token) {
    try {
      if(!API) return
      const {menuList} = await API.getPermissionList()
      const routes = utils.generateRoute(menuList)
      routes.map(route => {
        let url = `../views/${route.component}.vue`
        route.component = modules[`${url}`];
        router.addRoute("home", route)
      })
    } catch (error) {
    }
  }
}

loadAsyncRoutes().then(
  res=>{
    console.log('载入路由成功')
  }
)


// 判断当前地址是否可以访问
function checkPermission(path) {
  let hasPermission = router.getRoutes().filter(route => route.path === path).length
  if (hasPermission) {
    return true
  } else {
    return false
  }
}


// 导航守卫
router.beforeEach((to, from, next) => {
  if (checkPermission(to.path)) {
    document.title = to.meta.title
    next()
  } else {
    next('/404')
  }
})
export default router;
