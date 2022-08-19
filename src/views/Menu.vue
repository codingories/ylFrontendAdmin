<template>
  <div class="user-manage">
    <!--    <h3>用户管理</h3>-->
    <div class="query-form">
      <el-form :inline="true" :model="queryForm" ref="queryForm">
        <el-form-item label="菜单名称" prop="menuName">
          <el-input v-model="queryForm.menuName" placeholder="请输入菜单名称"></el-input>
        </el-form-item>
        <el-form-item label="菜单状态" prop="menuState">
          <el-select v-model="queryForm.menuState" placeholder="请输入菜单状态"
          >
            <el-option :value="1" label="正常"></el-option>
            <el-option :value="2" label="停用"></el-option>
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
        <el-button type="primary" @click="handleAdd(1)">新增</el-button>
      </div>
      <el-table
          :data="menuList"
          row-key="_id"
          :tree-props="{children: 'children'}"
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
            <el-button type="primary" @click="handleAdd(2, scope.row)">新增</el-button>
            <el-button type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog v-model="showModal" title="用户新增">
      <el-form ref="dialogForm" :model="menuForm" :label-width="100" :rules="rules">
        <el-form-item label="父级菜单" prop="parentId">
          <el-cascader
              v-model="menuForm.parentId"
              :options="menuList"
              :props="{ checkStrictly: true, value: '_id', label: 'menuName' }"
              clearable
          >

          </el-cascader>
          <span>
            不选，则直接创建一级菜单
          </span>
        </el-form-item>
        <el-form-item label="菜单类型" prop="menuType">
          <el-radio-group v-model="menuForm.menuType">
            <el-radio label="1">菜单</el-radio>
            <el-radio label="2">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单名称" prop="menuName">
          <el-input v-model="menuForm.menuName" placeholder="请输入菜单名称"/>
        </el-form-item>
        <el-form-item label="菜单图标" prop="icon">
          <el-input v-model="menuForm.icon" placeholder="请输入图标"/>
        </el-form-item>
        <el-form-item label="路由地址" prop="path">
          <el-input v-model="menuForm.path" placeholder="请输入路由地址"/>
        </el-form-item>
        <el-form-item label="权限标识" prop="menuCode">
          <el-input v-model="menuForm.menuCode" placeholder="请输入权限标识"/>
        </el-form-item>
        <el-form-item label="组件路径" prop="component">
          <el-input v-model="menuForm.component" placeholder="请输入组件路径"/>
        </el-form-item>
        <el-form-item label="菜单状态" prop="status">
          <el-radio-group v-model="menuForm.status">
            <el-radio label="1">正常</el-radio>
            <el-radio label="2">停用</el-radio>
          </el-radio-group>
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

<script lang=js>
import utils from "../utils/utils.js"

export default {
  name: 'menu',
  data() {
    return {
      menuForm: {},
      showModal: true,
      queryForm: {
        menuState: 1
      },
      action: '',
      menuList: [],
      rules: {
        menuName: [
          {
            required: true,
            message: '请输入菜单名称',
            trigger: 'blur',
          },
          {
            min: 2,
            max: 8,
            message: '长度在2-8个字符',
            trigger: 'blur',
          }
        ]
      },
      columns: [
        {
          label: '菜单名称',
          prop: 'menuName',
          width: 150
        },
        {
          label: '图标',
          prop: 'icon',
        },
        {
          label: '菜单类型',
          prop: 'menuType',
          formatter(row, column, value) {
            return {
              1: '菜单',
              2: '按钮'
            }[value];
          }
        },
        {
          label: '权限标识',
          prop: 'menuType',
          width: 80,
        },
        {
          label: '路由地址',
          prop: 'path',
          width: 130
        },
        {
          label: '组件路径',
          prop: 'path',
          width: 130
        },
        {
          label: '菜单状态',
          prop: 'menuState',
          width: 90,
          formatter(row, column, value) {
            return {
              1: '正常',
              2: '停用'
            }[value];
          }
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
    this.getMenuList()
  },
  methods: {
    async getMenuList() {
      try {
        this.menuList = await this.$api.getMenuList(this.queryForm)
      } catch (e) {
        console.error(e)
        throw new Error(e)
      }
    },
    handleQuery() {
    },
    handleClose() {
      this.showModal = false;
      this.handleReset('dialogForm');
    },
    handleReset(form) {
      this.$refs[form].resetFields()
    },
    handleAdd(type, row) {
      this.showModal = true
      this.action = "add"
      if (type === 2) {
        this.menuForm.parentId = [...row.parentId, row._id].filter((item) => item)
      }
    },
    handleEdit() {
    },
    handleDelete() {
    },
    handleSubmit() {
      this.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          let {action, menuForm} = this
          let params = {...menuForm, action}
          let res = await this.$api.menuSubmit(params)
          this.showModal = false
          this.$message.success('操作成功')
          this.handleReset('dialogForm')
          this.getMenuList()
        }
      })
    }
  }
}
</script>

<style>

</style>
