<template>
  <div class="user-manage">
    <!--    <h3>用户管理</h3>-->
    <div class="query-form">
      <query-form
          :form="form" v-model="user" @update:handleQuery="handleQuery" @reset="handleReset('form')"
      ></query-form>
    </div>
    <base-table :columns="columns" :data="userList"
                :pager="pager"
                @selection-change="handleSelectionChange"
                @handleAction="handleAction"
                @handleCurrentChange="handleCurrentChange"
    >
      <template #action>
        <el-button type="primary" @click="handleCreate">新增</el-button>
        <el-button type="danger" @click="handlePatchDel">批量删除</el-button>
      </template>
    </base-table>
    <el-dialog v-model="showModal" title="用户新增">
      <el-form ref="dialogForm" :model="userForm" :label-width="100" :rules="rules">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="userForm.userName" placeholder="请输入用户名称"
                    :disabled="action === 'edit'"
          />
        </el-form-item>
        <el-form-item label="邮箱" prop="userEmail">
          <el-input v-model="userForm.userEmail" placeholder="请输入用户邮箱"
                    :disabled="action === 'edit'"
          >
            <template #append>
              @myCompany.com
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="userForm.mobile" placeholder="请输入用户手机号"/>
        </el-form-item>
        <el-form-item label="岗位" prop="job">
          <el-input v-model="userForm.job" placeholder="请输入用户岗位"/>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="userForm.state" placeholder="请输入用户状态">
            <el-option :value="1" label="在职"></el-option>
            <el-option :value="2" label="离职"></el-option>
            <el-option :value="3" label="试用期"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="系统角色 " prop="roleList">
          <el-select v-model="userForm.roleList" placeholder="请输入用户系统角色" multiple style="width: 100%">
            <el-option
                v-for="role in roleList"
                :key="role._id"
                :label="role.roleName"
                :value="role._id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门" prop="deptId">
          <!-- value: '_id', label: 'deptName'  可以指定空间用的value 和label 对应接口的哪个字段 -->
          <el-cascader
              v-model="userForm.deptId"
              placeholder="请选择所属部门"
              :options="deptList"
              :props="{ checkStrictly: true, value: '_id', label: 'deptName', expandTrigger: 'click' }"
              clearable
              style="width: 100%"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import {getCurrentInstance, onMounted, reactive, ref, toRaw} from 'vue';
import api from '../api/index.js';
import utils from '../utils/utils.js';
import QueryForm from '../../packages/QueryForm/QueryForm.vue';
import BaseTable from '../../packages/BaseTable/BaseTable.vue';

const {proxy, ctx} = getCurrentInstance(); // ctx调用全局会有问题, 通过proxy来调用全局方法属性

// 初始化用户表单对象
const user = ref({
  // userId: '',
  // userName: '',
  // state: 1
});
const form = [
  {
    type: 'input',
    label: '用户Id',
    model: 'userId',
    placeholder: '请输入用户Id',
  },
  {
    type: 'input',
    label: '用户名称',
    model: 'userName',
    placeholder: '请输入用户名称',
  },
  {
    type: 'select',
    label: '状态',
    model: 'state',
    placeholder: '请选择状态',
    options: [
      {
        value: 0,
        label: '所有',
      },
      {
        value: 1,
        label: '在职',
      },
      {
        value: 2,
        label: '离职',
      },
      {
        value: 3,
        label: '试用期',
      }
    ]
  }
];
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
  getDeptList();
  getRoleList();
});
// 获取用户表格数据
const getUserList = async () => {
  let params = {...user.value, ...pager};
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
      console.log('fuck res=>', res);
      // if (res) {
      //
      // }
      showModal.value = false;
      proxy.$message.success('用户创建成功');
      handleReset('dialogForm');
      getUserList();
    }
  });
};

// 查询事件，获取用户列表
const handleQuery = (values) => {
  console.log('values', values, user.value);
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

const handleAction = ({index, row}) => {
  if (index === 0) {
    handleEdit(row);
  } else if (index === 1) {
    handleDel(row);
  }
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
// 弹框显示
const showModal = ref(false);
const handleCreate = () => {
  action.value = 'add';
  showModal.value = true;
};
// 用户编辑
const handleEdit = (row) => {
  action.value = 'edit';
  showModal.value = true;
  // 不能直接写,reset会有问题,会觉得初始状态就有值
  // Object.assign(userForm, row);
  // 等待dom渲染完成再执行，初始状态是空
  proxy.$nextTick(() => {
    // 把row的数据浅拷贝给userForm
    Object.assign(userForm, row);
    console.log('userForm', userForm);
  });
};
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
const getRoleList = async () => {
  let list = await proxy.$api.getRoleList();
  roleList.value = list;
};


// 定义动态表格头
const columns = reactive([
  {
    type: 'selection'
  },
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
    label: '最后登录时间', prop: 'lastLoginTime', width: 180
  },
  {
    type: 'action',
    label: '操作',
    width: 150,
    list: [
      {
        type: 'primary',
        text: '编辑',
        visible: true
      },
      {
        type: 'danger',
        text: '删除',
        visible: true
      }
    ]
  },
]);
</script>

<style>

</style>
