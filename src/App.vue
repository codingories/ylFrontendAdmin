<template>
  <!--  会渲染组件到里面,默认的根组件-->
  <router-view></router-view>
</template>
<script>
export default {
  name: 'app',
  mounted() {
    // this.$storage.setItem("name", "Ories")
    // console.log('name', this.$storage.getItem("name"))
    // this.$storage.setItem("age", 30)
    // console.log('age', this.$storage.getItem("age"))
    // this.$storage.setItem("userInfo", {age: 22, name: "Jorden"})
    // console.log('userInfo', this.$storage.getItem("userInfo"))
    // this.$storage.clearItem("age")
    // this.$storage.clearAll()
  }
}
</script>

<style lang="scss">
//@import './assets/style/reset.css';
//@import './assets/style/index.scss';
</style>
