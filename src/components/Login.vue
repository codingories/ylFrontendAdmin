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
  name: 'Login'
}
</script>

<style>

</style>
