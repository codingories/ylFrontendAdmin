<template>
  <!--  会渲染组件到里面,默认的根组件-->
  <router-view></router-view>
<!--  <v-input v-model="userName" v-model:title="title" @update:handleSubmit="handleSubmit"></v-input>-->
</template>
<script>
import VInput from "./views/VInput.vue"
import {ref} from "vue"

export default {
  name: 'app',
  components: {VInput},
  setup() {
    let userName = ref('jack')
    let title = ref('Vue3')
    const handleSubmit = (values) => {
      console.log("接受数据", values)
      console.log("当前对象:", userName)
    }
    return {
      userName,
      title,
      handleSubmit
    }
  }
}
</script>

<style lang="scss">
//@import './assets/style/reset.css';
//@import './assets/style/index.scss';
</style>
