<template>
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
</template>

<script lang="ts" setup>
import {defineProps} from 'vue';

defineProps({
  userMenu: {
    type: Array,
    default() {
      return []
    }
  }
})
</script>

<style>

</style>
