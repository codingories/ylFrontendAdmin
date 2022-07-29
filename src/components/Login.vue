<template>
  <div>欢迎来到登录界面</div>
  <el-button @click="goHome">回首页</el-button>
</template>


<script setup>

import {useRouter} from "vue-router"

const router = useRouter()

const goHome = () => {
  router.push('/welcome')
}

</script>


<script>

export default {
  name: 'Login',
  mounted() {
    // this.$request({
    //   method: 'get',
    //   url: 'login',
    //   data: {
    //     name: 'Jack'
    //   }
    // }).then(res => {
    //   console.log('res', res)
    // }, fail => {
    //   console.log('fail', fail)
    // })
    this.$request.get('/login',{name:'jack'}).then((res)=>{
      console.log('fuck', res)
    })
  }
}
</script>

<style>

</style>
