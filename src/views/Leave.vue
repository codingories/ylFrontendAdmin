<template>
  <div class="user-manage">
    <!--    <h3>用户管理</h3>-->
    <div class="query-form">

      <el-form :inline="true" :model="queryForm" ref="form">
        <el-form-item label="审批状态" prop="state">
          <el-select v-model="user.state">
            <el-option :value="''" label="全部"></el-option>
            <el-option :value="1" label="待审批"></el-option>
            <el-option :value="2" label="审批中"></el-option>
            <el-option :value="3" label="审批拒绝"></el-option>
            <el-option :value="4" label="审批通过"></el-option>
            <el-option :value="5" label="作废"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button @click="handleReset('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="handleCreate" v-has:add="'user-create'">新增</el-button>
        <el-button type="danger" @click="handlePatchDel">批量删除</el-button>
      </div>
      <el-table
          @selection-change="handleSelectionChange"
          :data="userList">
        <el-table-column type="selection" width="55"/>
        <el-table-column
            v-for="(item) in columns"
            :key="item.prop"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :formatter="item.formatter"
        >
        </el-table-column>
        <el-table-column
            label="操作"
            width="150">
          <template #default="scope">
            <el-button type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDel(scope.row)">删除</el-button>
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
import {getCurrentInstance, onMounted, reactive, ref, toRaw} from 'vue';
import api from '../api/index.js';
import utils from '../utils/utils.js';

const {proxy, ctx} = getCurrentInstance(); // ctx调用全局会有问题, 通过proxy来调用全局方法属性

// 初始化用户表单对象
const user = reactive({
  userId: '',
  userName: '',
  state: 1
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

// 用户弹窗关闭
const handleClose = () => {
  showModal.value = false;
  handleReset('dialogForm');
};
const action = ref('add');
// 用户提交
const handleSubmit = () => {
  proxy.$refs.dialogForm.validate(async (valid) => {
    if (valid) {
      //toRaw的作用是将响应式对象转为普通对象，避免修改某些值影响数据
      let {userEmail} = toRaw(userForm);
      let params = {
        ...userForm,
        userEmail: userEmail + '@myCompany.com',
        action: action.value
      };
      let res = await proxy.$api.userSubmit(params);
      showModal.value = false;
      let text;
      if (action.value === 'create') {
        text = '创建';
      } else {
        text = '编辑';
      }
      proxy.$message.success(`用户${text}成功`);
      handleReset('dialogForm');
      getUserList();
    }
  });
};

// 查询事件，获取用户列表
const handleQuery = () => {
  getUserList();
};
// 用户单个删除
const handleDel = async (row) => {
  await proxy.$api.userDel({
    userIds: [row.userId]
  });
  proxy.$message.success('删除成功');
  await getUserList();
};

const handleSelectionChange = (list) => {
  let arr = [];
  list.map(item => {
    arr.push(item.userId);
  });
  checkedUserIds.value = arr;
};
// 选中用户列表的对象
const checkedUserIds = ref([]);
// 批量删除
const handlePatchDel = async (row) => {
  if (checkedUserIds.value.length === 0) {
    proxy.$message.error('请选择要删除的用户');
    return;
  }
  const res = await proxy.$api.userDel({
    userIds: checkedUserIds.value
  });
  if (res.nModified > 0) {
    proxy.$message.success('删除成功');
    await getUserList();
  } else {
    proxy.$message.success('修改失败');
  }
};


// 重置查询表单
const handleReset = (form) => {
  proxy.$refs[form].resetFields();
};

// 分页事件处理
const handleCurrentChange = (current) => {
  pager.pageNum = current;
  getUserList();
};
// 新增用户
const userForm = reactive({
  state: 3
});


// 定义表单校验规则
const rules = reactive({
  userName: [
    {required: true, message: '请输入用户名称', trigger: 'blur'}
  ],
  userEmail: [
    {required: true, message: '请输入用户邮箱', trigger: 'blur'}
  ],
  mobile: [
    {
      // /^1[3|4|5|7|8|9]\d{9}$/
      pattern: /^1\d{10}$/,
      message: '请输入正确的手机号格式',
      trigger: 'blur'
    }
  ],
  deptId: [
    {
      required: true,
      message: '请输入用户邮箱',
      trigger: 'blur'
    }
  ]
});

// 所有的部门列表
const deptList = ref([]);
// 所有的角色列表
const roleList = ref([]);
// 获取所有的部门
const getDeptList = async () => {
  let list = await proxy.$api.getDeptList();
  deptList.value = list;
};

// 角色列表查询
const getRoleAllList = async () => {
  let list = await proxy.$api.getRoleAllList();
  roleList.value = list;
};


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
    formatter(row, column, value) {
      return {
        0: '管理员',
        1: '普通用户'
      }[value];
    }
  },
  {
    label: '用户状态', prop: 'state',
    formatter(row, column, value) {
      return {
        1: '在职',
        2: '离职',
        3: '试用期'
      }[value];
    }
  },
  {
    label: '用户名', prop: 'userName',
  },
  {
    label: '注册时间', prop: 'createTime', width: 180, formatter(row, column, value) {
      return utils.formatDate(new Date(value));
    }
  },
  {
    label: '最后登录时间', prop: 'lastLoginTime', width: 180,
    formatter(row, column, value) {
      return utils.formatDate(new Date(value));
    }
  },
]);
</script>

<style>

</style>
