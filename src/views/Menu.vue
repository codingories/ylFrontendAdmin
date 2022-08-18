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
        <el-button type="primary" @click="handleAdd">新增</el-button>
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
            <el-button type="primary" @click="handleAdd(scope.row)">新增</el-button>
            <el-button type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--    <el-dialog v-model="showModal" title="用户新增">-->
    <!--      <el-form ref="dialogForm" :model="userForm" :label-width="100" :rules="rules">-->
    <!--        <el-form-item label="用户名" prop="userName">-->
    <!--          <el-input v-model="userForm.userName" placeholder="请输入用户名称"-->
    <!--                    :disabled="action === 'edit'"-->
    <!--          />-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="邮箱" prop="userEmail">-->
    <!--          <el-input v-model="userForm.userEmail" placeholder="请输入用户邮箱"-->
    <!--                    :disabled="action === 'edit'"-->
    <!--          >-->
    <!--            <template #append>-->
    <!--              @myCompany.com-->
    <!--            </template>-->
    <!--          </el-input>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="手机号" prop="mobile">-->
    <!--          <el-input v-model="userForm.mobile" placeholder="请输入用户手机号"/>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="岗位" prop="job">-->
    <!--          <el-input v-model="userForm.job" placeholder="请输入用户岗位"/>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="状态" prop="state">-->
    <!--          <el-select v-model="userForm.state" placeholder="请输入用户状态">-->
    <!--            <el-option :value="1" label="在职"></el-option>-->
    <!--            <el-option :value="2" label="离职"></el-option>-->
    <!--            <el-option :value="3" label="试用期"></el-option>-->
    <!--          </el-select>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="系统角色 " prop="roleList">-->
    <!--          <el-select v-model="userForm.roleList" placeholder="请输入用户系统角色" multiple style="width: 100%">-->
    <!--            <el-option-->
    <!--                v-for="role in roleList"-->
    <!--                :key="role._id"-->
    <!--                :label="role.roleName"-->
    <!--                :value="role._id"-->
    <!--            ></el-option>-->
    <!--          </el-select>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="部门" prop="deptId">-->
    <!--          &lt;!&ndash; value: '_id', label: 'deptName'  可以指定空间用的value 和label 对应接口的哪个字段 &ndash;&gt;-->
    <!--          <el-cascader-->
    <!--              v-model="userForm.deptId"-->
    <!--              placeholder="请选择所属部门"-->
    <!--              :options="deptList"-->
    <!--              :props="{ checkStrictly: true, value: '_id', label: 'deptName', expandTrigger: 'click' }"-->
    <!--              clearable-->
    <!--              style="width: 100%"-->
    <!--          ></el-cascader>-->
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
  name: 'menu',
  data() {
    return {
      queryForm: {
        menuState: 1
      },

      menuList: [],
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
    handleReset() {
    },
    handleAdd() {
    },
    handleEdit() {
    },
    handleDelete() {
    },
  }
}
</script>

<style>

</style>
