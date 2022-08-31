<template>
  <div>
    <div class="query-form">
      <el-form :inline="true" :model="queryModel" ref="queryForm">
        <template v-for="(item, index) in form" :key="index">
          <FormItem :item="item" v-bind="item" v-model="queryModel[item.model]" />
        </template>
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
  props: ["modelValue", "form"],
  emits: ["update:modelValue", "update:handleQuery"],
  components: {FormItem},
  setup(props, context) {
    const {proxy} = getCurrentInstance()
    const queryModel = reactive({
      ...props.modelValue
    })
    const handleReset = () => {
      proxy.$refs.queryForm.resetFields()
    }
    const handleQuery = () => {
      context.emit("update:modelValue", {...queryModel})
      context.emit("update:handleQuery", {...queryModel})
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
