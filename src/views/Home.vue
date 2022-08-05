<template>
  <div class="basic-layout">
    <div :class="['nav-side', isCollapse?'fold':'unfold']">
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
          :collapse="isCollapse"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <setting/>
            </el-icon>
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
            <el-icon>
              <setting/>
            </el-icon>
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
    <div :class="['content-right', isCollapse?'fold':'unfold']">
      <div class="nav-top">
        <div class="nav-left">
          <div class="menu-fold" @click="toggle">
            <el-icon>
              <Fold/>
            </el-icon>
          </div>
          <div class="bread">面包屑</div>
        </div>

        <div class="user-info">
          <el-badge :is-dot="true" class="notice" type="danger">
            <el-icon>
              <bell/>
            </el-icon>
          </el-badge>
          <el-dropdown @command="handleLogout" class="down">
          <span class="user-link">
            {{ userInfo.userName }}
            <el-icon class="el-icon--right">
              <arrow-down/>
            </el-icon>
          </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="email">邮箱: {{ userInfo.userEmail }}</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

        </div>
      </div>
      <div class="wrapper">
        <div class="main-page">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import {reactive, ref} from "vue"
import {useStore} from "vuex"
import {useRouter} from "vue-router"

const store = useStore()
const router = useRouter()
const isCollapse = ref(false)
const toggle = () => {
  isCollapse.value = !isCollapse.value
}
const userInfo = reactive({
  userName: "Ories",
  userEmail: "tellt@126.com"
})
const handleLogout = (key) => {
  if (key === 'email') return;
  store.commit('saveUserInfo', '')
  userInfo.value = {};
  router.push('/login')
}
</script>

<script>
export default {
  name: 'Home'
}
</script>

<style lang="scss">
.basic-layout {
  //border: 1px solid red;
  position: relative;

  .nav-side {
    border: 1px solid blue;
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
    //合并展开
    &.fold {
      width: 64px;
    }
    //合并展开
    &.unfold {
      width: 200px;
    }
  }

  .content-right {
    margin-left: 200px;
    //合并展开
    &.fold {
      margin-left: 64px;
    }
    //合并展开
    &.unfold {
      margin-left: 200px;
    }
    .nav-top {
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
      padding: 0 20px;

      .nav-left {
        display: flex;
        align-items: center;
        .menu-fold {
          margin-top: 4px;
          //border: 1px solid green;
          margin-right: 15px;
          font-size: 18px;
        }
      }

      .user-info {
        //border: 1px solid red;
        .down {
          //border: 1px solid blue;
          line-height: 50px;

        }
        .notice {
          line-height: 30px;
          margin-right: 15px;
        }
        .user-link {
          cursor: pointer;
          color: #409fff;
        }
      }
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
