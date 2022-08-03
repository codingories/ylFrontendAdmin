<template>
  <div class="login-wrapper">
    <div class="modal">
      <el-form>
        <div class="title">火星</div>
        <el-form-item>
          <el-input type="text" prefix-icon="User"/>
        </el-form-item>
        <el-form-item>
          <el-input type="password" prefix-icon="UserFilled"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn-login">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
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
    this.$request.get('/login', {name: 'jack'}).then((res) => {
      console.log('fuck', res)
    })
  }
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
