<template>
  <div class="login-wrapper">
    <div class="modal">
      <el-form ref="userFormRef" :model="user" status-icon :rules="rules">
        <div class="title">火星</div>
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
    </div>
  </div>
</template>


<script setup>
import {reactive, ref} from "vue"
import api from '../api'
import {useRouter} from "vue-router"
import {useStore} from "vuex"
const user = reactive({
  userName: "",
  userPwd: ""
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
const login = async (formEl) => {
  if (!formEl) {
    return
  }
  await formEl.validate((valid, fields) => {
    if (valid) {
      api.login(user).then(res=>{
        console.log('res 2222', res)
        store.commit('saveUserInfo', res)
        console.log('2222')
        console.log('router',router)
        console.log('333')
        router.push('/welcome')
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
      font-size: 50px;
      line-height: 1.5;
      text-align: center;
      margin-bottom: 30px;
    }

    .btn-login {
      width: 100%;
    }
  }
}
</style>
