<template>
  <div class="login-wrapper">
    <div class="modal">
      <el-form ref="userFormRef" :model="user" status-icon :rules="rules">
        <div class="title">手撸Koa2+Vue3管理后台</div>
        <el-form-item prop="userName">
          <el-input type="text" prefix-icon="User" v-model="user.userName"/>
        </el-form-item>
        <el-form-item prop="userPwd">
          <el-input type="password" prefix-icon="UserFilled" v-model="user.userPwd"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn-login" @click="login(userFormRef)">
            登录
          </el-button>
        </el-form-item>
      </el-form>
      <div class="admin">
        <span>系统管理员账号:admin 密码:admin,用于添加账号等系统管理功能</span>
      </div>

      <div class="demo">
        <div>
          <span>审批流演示</span>
        </div>

        <div>
          审批发起，测试账号:jack 密码:admin
        </div>
        <div>
          到二级部门，人事部门进行审批，测试账号:Baidu 密码:123456，审批通过
        </div>
        <div>
          到三级部门，财务部门进行最终审批，测试账号:Ali 密码:123456，审批流结束
        </div>
        <div>
          前端代码仓库:
          <a href="https://github.com/codingories/myKoa2AdminFE" target="_blank">这里</a>
        </div>
        <div>
          后端代码仓库:
          <a href="https://github.com/codingories/myKoa2AdminServer" target="_blank">这里</a>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
const modules = import.meta.glob("../views/**.vue")
import {reactive, ref} from "vue"
import api from '../api'
import {useRouter} from "vue-router"
import {useStore} from "vuex"
import storage from "../utils/storage.js"
import API from "../api/index.js"
import utils from "../utils/utils.js"
const user = reactive({
  userName: "admin",
  userPwd: "123456"
})
const userFormRef = ref()
const router = useRouter()
const rules = reactive({
  userName: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
  ],
  userPwd: [
    {required: true, message: '请输入密码', trigger: 'blur'},
  ]
})
const store = useStore()

async function loadAsyncRoutes() {
  let userInfo = storage.getItem("userInfo") || {}
  if (userInfo.token) {
    try {
      const {menuList} = await API.getPermissionList()
      const routes = utils.generateRoute(menuList)
      routes.map(route => {
        // let url = `../views/${route.component}.vue`
        // route.component = () => import(url)
        let url = `./${route.component}.vue`
        console.log('url', url)
        console.log('modules', modules)
        route.component =  modules[/* @vite-ignore */ url]
        console.log(route)
        router.addRoute("home", route)
      })
    } catch (error) {
      console.log('登录页面error' + error)
    }
  }
}

const login = async (formEl) => {
  if (!formEl) {
    return
  }
  await formEl.validate( (valid, fields) => {
    if (valid) {
      api.login(user).then(async res=>{
        store.commit('saveUserInfo', res)
        await loadAsyncRoutes();
        await router.push('/welcome')
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<script>

export default {
  name: 'Login',
}
</script>

<style lang="scss">
//利用根的class来避免css污染，不用scoped，scoped会生成很多垃圾代码
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9fcff;
  width: 100vw;
  height: 100vh;

  .modal {
    width: 500px;
    padding: 50px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 10px 3px #c7c9cb4d;

    .title {
      font-size: 30px;
      line-height: 1.5;
      text-align: center;
      margin-bottom: 30px;
    }

    .btn-login {
      width: 100%;
    }
  }
  .admin {
    line-height: 1.5;
    color: #409eff;
  }
  .demo {
    line-height: 1.5;
    //text-align: center;
    font-size: 13px;
    color: #67c23a;
    a {
      color: #409eff;
    }
  }
}
</style>
