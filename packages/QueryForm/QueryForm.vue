<template>
  <div>
    <div class="query-form">
      <el-form :inline="true" :model="queryModel" ref="queryForm">
        <template v-for="(item, index) in form" :key="index">
          <FormItem :item="item"></FormItem>
        </template>
        <!--        <el-form-item label="用户ID" prop="userId">-->
        <!--          <el-input v-model="user.userId" placeholder="请输入用户ID"></el-input>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="用户名称" prop="userName">-->
        <!--          <el-input v-model="user.userName" placeholder="请输入用户名称"-->
        <!--          ></el-input>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="用户状态" prop="state">-->
        <!--          <el-select v-model="user.state">-->
        <!--            <el-option :value="0" label="所有"></el-option>-->
        <!--            <el-option :value="1" label="在职"></el-option>-->
        <!--            <el-option :value="2" label="离职"></el-option>-->
        <!--            <el-option :value="3" label="试用期"></el-option>-->
        <!--          </el-select>-->
        <!--        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button @click="handleReset('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>

/**
 * form = [
 * {
 *   type: "input",
 *   model: "userId",
 *   label: "用户ID",
 *   placeholder: "请输入用户ID"
 * }
 * ]
 */
import FormItem from "./FormItem.vue"
import {getCurrentInstance, reactive} from "vue"

export default {
  name: 'QueryForm',
  props: ["form"],
  components: {FormItem},
  setup(props) {
    const {proxy} = getCurrentInstance()
    const form = props.form
    const queryModel = reactive({

    })
    const handleReset = () => {
      proxy.refs.queryForm.resetFields()
    }
    const handleQuery = () => {

    }
    return {
      handleQuery,
      handleReset,
      queryModel
    }
  }
}
</script>
<style lang='scss' scoped>

</style>
