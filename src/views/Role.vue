<template>
  <div class="role-manage">
    <!--    <h3>用户管理</h3>-->
    <div class="query-form">
      <el-form :inline="true" :model="queryForm" ref="queryForm">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="queryForm.roleName" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getRoleList">查询</el-button>
          <el-button @click="handleReset('queryForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="handleAdd(1)">创建</el-button>
      </div>
      <el-table
          :data="roleList"
      >
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
            width="220">
          <template #default="scope">
            <el-button type="primary">编辑</el-button>
            <el-button>设置权限</el-button>
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


    <!--    <el-dialog v-model="showModal" title="用户新增">-->
    <!--      <el-form ref="dialogForm" :model="menuForm" :label-width="100" :rules="rules">-->
    <!--        <el-form-item label="父级菜单" prop="parentId">-->
    <!--          <el-cascader-->
    <!--              v-model="menuForm.parentId"-->
    <!--              :options="menuList"-->
    <!--              :props="{ checkStrictly: true, value: '_id', label: 'menuName' }"-->
    <!--              clearable-->
    <!--          >-->

    <!--          </el-cascader>-->
    <!--          <span>-->
    <!--            不选，则直接创建一级菜单-->
    <!--          </span>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="菜单类型" prop="menuType">-->
    <!--          <el-radio-group v-model="menuForm.menuType">-->
    <!--            <el-radio :label="1">菜单</el-radio>-->
    <!--            <el-radio :label="2">按钮</el-radio>-->
    <!--          </el-radio-group>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="菜单名称" prop="menuName">-->
    <!--          <el-input v-model="menuForm.menuName" placeholder="请输入菜单名称"/>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="菜单图标" prop="icon" v-show="menuForm.menuType === 1">-->
    <!--          <el-input v-model="menuForm.icon" placeholder="请输入图标"/>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="路由地址" prop="path" v-show="menuForm.menuType === 1">-->
    <!--          <el-input v-model="menuForm.path" placeholder="请输入路由地址"/>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="权限标识" prop="menuCode" v-show="menuForm.menuType === 2">-->
    <!--          <el-input v-model="menuForm.menuCode" placeholder="请输入权限标识"/>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="组件路径" prop="component" v-show="menuForm.menuType === 1">-->
    <!--          <el-input v-model="menuForm.component" placeholder="请输入组件路径"/>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="菜单状态" prop="menuState" v-show="menuForm.menuType === 1">-->
    <!--          <el-radio-group v-model="menuForm.menuState">-->
    <!--            <el-radio :label="1">正常</el-radio>-->
    <!--            <el-radio :label="2">停用</el-radio>-->
    <!--          </el-radio-group>-->
    <!--        </el-form-item>-->
    <!--      </el-form>-->
    <!--      <template #footer>-->
    <!--      <span class="dialog-footer">-->
    <!--          <el-button @click="handleClose">取 消</el-button>-->
    <!--          <el-button type="primary" @click="handleSubmit">确 定</el-button>-->
    <!--      </span>-->
    <!--      </template>-->
    <!--    </el-dialog>-->
  </div>
</template>

<script lang=js>
import utils from "../utils/utils.js"

export default {
  name: 'role',
  data() {
    return {
      pager: {
        pageNum: 1,
        pageSize: 10,
        total: 100
      },
      queryForm: {
        roleName: 1
      },
      roleList: [],
      columns: [
        {
          label: '角色名称',
          prop: 'roleName',
          width: 150
        },
        {
          label: '备注',
          prop: 'remark',
        },
        {
          label: '权限列表',
          prop: 'menuType',
        },
        {
          label: '创建时间',
          prop: 'createTime',
          width: 180,
          formatter(row, column, value) {
            return utils.formatDate(new Date(value));
          }
        },
      ]
    }
  },
  mounted() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      try {
        let {list, page} = await this.$api.getRoleList(this.queryForm)
        this.roleList = list
        this.pager.total = page.total
      } catch (e) {
        console.error(e)
        throw new Error(e)
      }
    },
    handleQuery() {
      this.getMenuList()
    },
    handleReset(form) {
      console.log(form)
      console.log(this.$refs)
      console.log(this.$refs[form])
      this.$refs[form].resetFields()
    },

    async handleDel(_id) {
      await this.$api.menuSubmit({_id, action: 'delete'})
      this.$message.success('删除成功')
      this.getMenuList()
    },

  }
}
</script>

<style>

</style>
