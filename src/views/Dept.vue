<template>
  <div class="dept-manage">
<!--    {{deptList}}-->
    <div class="query-form">
      <el-form :inline="true" ref="queryForm" :model="queryForm">
        <el-form-item label="部门名称">
          <el-input placeholder="请输入部门名称" v-model="queryForm.deptName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getDeptList" type="primary">查询</el-button>
          <el-button @click="handleReset('queryForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="handleOpen">创建</el-button>
      </div>
      <el-table
          :data="deptList"
          row-key="_id"
          :tree-props="{children: 'children'}"
          stripe
      >
        <el-table-column v-for="item in columns"
                         :key="item.prop"
                         v-bind="item"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" type="primary" @click="handleEdit(scope.row)">创建</el-button>
            <el-button size="small" type="danger" @click="handleDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="action==='create'?'创建部门':'编辑部门'" v-model="showModal">
      <el-form ref="dialogForm" :model="deptForm" :rules="rules" label-width="120px">
        <el-form-item label="上级部门" prop="parentId">
          <el-cascader
              placeholder="请选择上级部门"
              v-model="deptForm.parentId"
              :props="{ checkStrictly: true, value: '_id', label: 'deptName' }"
              clearable
              :options="deptList"
              :show-all-levels="true"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="部门名称" prop="deptName">
          <el-input v-model="deptForm.deptName" placeholder="请输入部门名称"></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="user">
          <el-select v-model="deptForm.user" placeholder="请选择部门负责人">
            <el-option v-for="item in userList" :key="item.userId"
                       :label="item.userName"
                       :value="`${item.userId}/${item.userName}/${item.userEmail}`"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="负责人邮箱" prop="userEmail">
          <el-input v-model="deptForm.userEmail"
                    placeholder="请输入负责人邮箱"
                    disabled
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button @click="handleSubmit" type="primary">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'dept',
  data() {
    return {
      showModal: false,
      queryForm: {
        deptName: '',
      },
      columns: [
        {
          label: '部门名称',
          prop: 'deptName'
        },
        {
          label: '负责人',
          prop: 'userName'
        },
        {
          label: '更新时间',
          prop: 'updateTime'
        },
        {
          label: '创建时间',
          prop: 'createTime'
        }
      ],
      deptForm: {},
      pager: {
        pageNum: 1,
        pageSize: 10
      },
      deptList: [],
      action: '',
      userList: [],
      rules: {
        parentId: [
          {
            required: true,
            message: '请选择上级部门',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted() {
    this.getDeptList()
    this.getAllUserList()
  },
  methods: {
    handleClose() {},
    handleSubmit() {},
    async getDeptList() {
      let list = await this.$api.getDeptList({...this.queryForm, ...this.pager})
      this.deptList = list;
    },
    async getAllUserList() {
      this.userList = await this.$api.getAllUserList()
    },
    handleReset(form) {
      this.$refs[form].resetFields()
    },
    handleOpen() {
      this.action = 'create'
      this.showModal = true
    },
    handleEdit(row) {
      this.action = 'edit'
      this.showModal = true
    },
    handleDel(id) {
      this.action = 'delete'
      this.showModal = true
    },
  }
}
</script>
<style lang='scss' scoped>

</style>
