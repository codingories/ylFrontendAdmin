<template>
  <div class="user-manage">
    <!--    <h3>用户管理</h3>-->
    <div class="query-form">
      <el-form :inline="true" :model="queryForm" ref="form">
        <el-form-item label="审批状态" prop="applyState">
          <el-select v-model="queryForm.applyState">
            <el-option :value="''" label="全部"></el-option>
            <el-option :value="1" label="待审批"></el-option>
            <el-option :value="2" label="审批中"></el-option>
            <el-option :value="3" label="审批拒绝"></el-option>
            <el-option :value="4" label="审批通过"></el-option>
            <el-option :value="5" label="作废"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getApplyList">查询</el-button>
          <el-button @click="handleReset('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="handleApply">申请休假</el-button>
      </div>
      <el-table
          :data="applyList">
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
            <el-button type="primary">查看</el-button>
            <el-button type="danger" size="small">作废</el-button>
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
    <el-dialog title="休假申请" v-model="showModal" width="70%">
      <el-form ref="dialogForm" :model="leaveForm" label-width="120px">
        <el-form-item label="休假类型" prop="applyType" required>
          <el-select v-model="leaveForm.applyType">
            <el-option :label="'事假'" :value="1"></el-option>
            <el-option :label="'调休'" :value="2"></el-option>
            <el-option :label="'年假'" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="休假类型" prop="applyType" required>
          <el-row align='middle'>
            <el-col :span="8">
              <el-form-item prop="startTime" required>
                <el-date-picker v-model="leaveForm.startTime"
                                type="date" placeholder="选择开始日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="1" class="xxx">-</el-col>
            <el-col :span="8">
              <el-form-item prop="endTime" required>
                <el-date-picker v-model="leaveForm.endTime"
                                type="date" placeholder="选择结束日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="休假时长" required>
          0天
        </el-form-item>
        <el-form-item label="休假原因" props="reasons" required>
          <el-input type="textarea" :row="3" placeholder="请输入休假原因" v-model="leaveForm.reasons"></el-input>
        </el-form-item>
        <!--        <el-form-item label="休假类型" prop="applyType" required>-->
        <!--          <el-date-picker v-model="leaveForm.startTime"-->
        <!--            type="date" placeholder="选择开始日期"-->
        <!--          ></el-date-picker>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="休假类型" prop="applyType" required>-->
        <!--          <el-date-picker v-model="leaveForm.endTime"-->
        <!--                          type="date" placeholder="选择结束日期"-->
        <!--          ></el-date-picker>-->
        <!--        </el-form-item>-->
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

const {proxy, ctx} = getCurrentInstance(); // ctx调用全局会有问题, 通过proxy来调用全局方法属性

const queryForm = reactive({
  applyState: ''
});

const showModal = ref(false);
// 初始化分页
const pager = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 100
});
// 初始化用户列表
const userList = ref([]);
// 点击申请休假，展示弹框
const handleApply = () => {
  showModal.value = true;
  action.value = 'create';
};
const action = ref('create');

// 初始化接口调用
onMounted(() => {
  getApplyList();
});
const leaveForm = reactive({
  applyType: 1,
  startTime: '',
  endTime: '',
  leaveTime: '0天',
  reasons: ''
});

const applyList = ref([]);

const getApplyList = async () => {
  let params = {...queryForm, ...pager};
  let {list, page} = await api.getApplyList(params);
  applyList.value = list;
  pager.total = page.total;
};

// 用户弹窗关闭
const handleClose = () => {
  showModal.value = false;
  handleReset('dialogForm');
};
// 用户提交
const handleSubmit = () => {
  proxy.$refs.dialogForm.validate(async (valid) => {
    if (valid) {
      //toRaw的作用是将响应式对象转为普通对象，避免修改某些值影响数据
      // let {userEmail} = toRaw(userForm);
      // let params = {
      //   ...userForm,
      //   userEmail: userEmail + '@myCompany.com',
      //   action: action.value
      // };
      // let res = await proxy.$api.userSubmit(params);
      // showModal.value = false;
      // let text;
      // if (action.value === 'create') {
      //   text = '创建';
      // } else {
      //   text = '编辑';
      // }
      // proxy.$message.success(`用户${text}成功`);
      // handleReset('dialogForm');
      // getUserList();
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
    label: '单号', prop: 'orderNo'
  },
  {
    label: '休假时间', prop: '', formatter(row, column, value) {
      return utils.formatDate(new Date(row.startTime), 'yyyy-MM-dd') + '到'
          + utils.formatDate(new Date(row.endTime), 'yyyy-MM-dd');
    }
  },
  {
    label: '休假时长', prop: 'leaveTime'
  },
  {
    label: '休假类型', prop: 'applyType',
    formatter(row, column, value) {
      return {
        1: '事假',
        2: '调休',
        3: '年假'
      }[value];
    }
  },
  {
    label: '休假原因', prop: 'reasons'
  },
  {
    label: '申请时间', prop: 'createTime', width: 180, formatter(row, column, value) {
      return utils.formatDate(new Date(value));
    }
  },
  {
    label: '审批人', prop: 'auditUsers', width: 180
  },
  {
    label: '当前审批人', prop: 'curAuditUserName', width: 180
  },
  {
    label: '审批状态', prop: 'applyState', width: 180,
    formatter(row, column, value) {
      return {
        1: '待审批',
        2: '审批中',
        3: '审批拒绝',
        4: '审批通过',
        5: '作废'
      }[value];
    }
  },
]);
</script>

<style>
.xxx {
  display: flex;
  justify-content: center;
}
</style>
