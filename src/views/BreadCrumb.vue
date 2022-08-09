<template>

  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="(item, index) in breadList" :key="item.path">
      <router-link to="/welcome" v-if="index===0">
       {{item.meta.title}}
      </router-link>
      <span v-else>
        {{item.meta.title}}
      </span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import {ArrowRight} from '@element-plus/icons-vue';
import {useRoute} from 'vue-router';
import {computed, onMounted} from 'vue';

const route = useRoute();

onMounted(() => {
  console.log('routes', route, JSON.stringify(route));
  // 里面的matched表示当前页面所匹配的路由记录，比如当前是welcome，它会把它的上一级/也记录下来
});
const breadList = computed(()=>{
  // 我们通过遍历matched来实现
  return route.matched
})
</script>

<style>

</style>
