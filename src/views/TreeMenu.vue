<template>
  <template v-for="menu in userMenu">
    <el-sub-menu v-if="menu.children && menu.children.length > 0 && menu.children[0].menuType==='1'" :key="menu._id" :index="menu.path">
      <template #title>
        <el-icon>
          <component :is="menu.icon"/>
        </el-icon>
        <span>{{ menu.menuName }}</span>
      </template>
      <!--      如果有children继续放到menu.children里面-->
      <tree-menu :user-menu="menu.children"/>
      <!--      不是父菜单就是子菜单-->
    </el-sub-menu>
    <el-menu-item v-else-if="menu.menuType==='1'" :index="menu.path" :key="menu._id">
      <span>{{ menu.menuName }}</span>
    </el-menu-item>
  </template>
</template>

<script lang="ts" setup>


defineProps({
  userMenu: {
    type: Array,
    default() {
      return [];
    }
  }
});
</script>

<style>

</style>
