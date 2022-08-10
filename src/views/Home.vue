<template>
  <div class="basic-layout">
    <div :class="['nav-side', isCollapse?'fold':'unfold']">
      <!--      系统LOGO-->
      <div class="logo">
        <img src="../assets/images/logo.png" alt="">
        <span>Manager</span>
      </div>
<!--      {{activeMenu}}-->
      <!--      导航菜单-->
      <el-menu
          :default-active = "activeMenu"
          background-color="#001529"
          text-color="#fff"
          router
          default-active="2"
          class="nav-menu"
          :collapse="isCollapse"
      >
        <TreeMenu :user-menu="userMenu"></TreeMenu>
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
          <div class="bread">
            <bread-crumb></bread-crumb>
          </div>
        </div>

        <div class="user-info">
          <el-badge :is-dot="Boolean(noticeCount)" class="notice" type="danger">
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
        <router-view></router-view>
<!--        <div class="main-page">-->
<!--          <router-view></router-view>-->
<!--        </div>-->
      </div>
    </div>
  </div>
</template>

<script setup>

import {onMounted, ref} from "vue"
import {useStore} from "vuex"
import {useRouter} from "vue-router"
import api from "../api/index.js"
import TreeMenu from "./TreeMenu.vue"
import BreadCrumb from "./BreadCrumb.vue"

const store = useStore()
const router = useRouter()
const isCollapse = ref(false)
const toggle = () => {
  isCollapse.value = !isCollapse.value
}
const userInfo = store.state.userInfo
const noticeCount = ref(0)
const userMenu = ref([])
const state = useStore()
let activeMenu = ref(location.hash.slice(1))
onMounted(() => {
  getNoticeCount()
  getMenuList()
})

const getNoticeCount = async () => {
  try {
    noticeCount.value = await api.noticeCount()
  } catch (error) {
    console.error(error)
  }
}

const getMenuList = async () => {
  try {
    userMenu.value = await api.getMenuList()
  } catch (error) {
    console.error(error)
  }
}

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
          display: flex;
          margin-right: 15px;
          font-size: 18px;
        }
      }

      .user-info {
        .down {
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
