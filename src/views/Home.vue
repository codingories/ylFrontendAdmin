<template>
  <div class="basic-layout">
    <div class="nav-side">
<!--      系统LOGO-->
      <div class="logo">
        <img src="../assets/images/logo.png" alt="">
        <span>Manager</span>
      </div>
<!--      导航菜单-->
      <el-menu
          background-color="#001529"
          text-color="#fff"
          router
          default-active="2"
          class="nav-menu"
          :collapse="false"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><setting /></el-icon>
            <span>系统管理</span>
          </template>
          <el-menu-item index="1-1">
            <span>用户管理</span>
          </el-menu-item>
          <el-menu-item index="1-2">
            <span>菜单管理</span>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><setting /></el-icon>
            <span>审批管理</span>
          </template>
          <el-menu-item index="2-1">
            <span>休假申请</span>
          </el-menu-item>
          <el-menu-item index="2-2">
            <span>待我审批</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
    <div class="content-right">
      <div class="nav-top">
        <div class="nav-left">
          <el-icon><Fold /></el-icon>
          <div class="bread">面包屑</div>
        </div>

        <div class="user-info">用户</div>
      </div>
      <div class="wrapper">
        <div class="main-page">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style lang="scss">
.basic-layout {
  position: relative;
  .nav-side {
    position: fixed;
    width: 200px;
    height: 100vh;
    background-color: #001529;
    color: #fff;
    overflow-y: auto;
    transition: width .5s;
    .logo {
      display: flex;
      align-items: center;
      font-size: 18px;
      height: 50px;
      img {
        margin: 0 16px;
        width: 32px;
        height: 32px;
      }
    }
    .nav-menu {
      //border: 1px solid red;
      border-right: none;
      height: calc(100vh - 50px);
    }
  }

  .content-right {
    margin-left: 200px;
    .nav-top {
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
      padding: 0 20px;
    }
    .wrapper {
      background: #eef0f3;
      padding: 20px;
      height: calc(100vh - 50px);
      .main-page {
        height: 100%;
        background: #fff;
      }
    }
  }
}
</style>
