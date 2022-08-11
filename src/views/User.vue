<template>
  <div class="user-manage">
    <!--    <h3>用户管理</h3>-->
    <div class="query-form">
      <el-form :inline="true" :model="user" ref="form">
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="user.userId" placeholder="请输入用户ID"></el-input>
        </el-form-item>
        <el-form-item label="用户名称" prop="userName">
          <el-input v-model="user.userName" placeholder="请输入用户名称"></el-input>
        </el-form-item>
        <el-form-item label="用户状态" prop="state">
          <el-select v-model="user.state">
            <el-option :value="0" label="所有"></el-option>
            <el-option :value="1" label="在职"></el-option>
            <el-option :value="2" label="离职"></el-option>
            <el-option :value="3" label="试用期"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary">新增</el-button>
        <el-button type="danger">批量删除</el-button>
      </div>
      <el-table
          :data="userList">
        <el-table-column type="selection" width="55"/>
        <el-table-column
            v-for="(item) in columns"
            :key="item.prop"
            :prop="item.prop"
            :label="item.label"
            :width="item.width">
        </el-table-column>
        <el-table-column
            label="操作"
            width="150">
          <template #default>
            <el-button type="primary">编辑</el-button>
            <el-button type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          class="pagination"
          background
          layout="prev, pager, next, jumper"
          :total="pager.total"
          :page-size="pager.pageSize"
          @current-change="handleCurrentChange"
      />

    </div>
  </div>
</template>

<script lang="ts" setup>
import {getCurrentInstance, onMounted, reactive, ref} from 'vue';
import api from '../api/index.js';

const {proxy, ctx} = getCurrentInstance(); // ctx调用全局会有问题, 通过proxy来调用全局方法属性

// 初始化用户表单对象
const user = reactive({
  userId: '',
  userName: '',
  state: 0
});
// 初始化分页
const pager = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 100
});
// 初始化用户列表
const userList = ref([]);

// 初始化接口调用
onMounted(() => {
  getUserList();
});
// 获取用户表格数据
const getUserList = async () => {
  let params = {...user, ...pager};
  try {
    const {list, page} = await api.getUserList(params);
    userList.value = list;
    pager.total = page.total;
  } catch (e) {
    console.log(e);
  }
};

// 查询事件，获取用户列表
const handleQuery = () => {
  getUserList();
};

// 重置查询表单
const handleReset = () => {
  console.log('111');
  proxy.$refs.form.resetFields();
  // ctx.$refs.form.resetFields()
};

// 分页事件处理
const handleCurrentChange = (current) => {
  pager.pageNum = current;
  getUserList()
}

// 定义动态表格头
const columns = reactive([
  {
    label: '用户ID', prop: 'userId'
  },
  {
    label: '用户名', prop: 'userName',
  },
  {
    label: '用户邮箱', prop: 'userEmail'
  },
  {
    label: '用户角色', prop: 'role',
  },
  {
    label: '用户状态', prop: 'state'
  },
  {
    label: '用户名', prop: 'userName',
  },
  {
    label: '注册时间', prop: 'createTime'
  },
  {
    label: '最后登录时间', prop: 'lastLoginTime',
  },
]);
</script>

<style>

</style>
