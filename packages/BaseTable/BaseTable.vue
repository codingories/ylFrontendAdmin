<template>
  <div class="base-table">
    <div class="action">
      <slot name="action"></slot>
    </div>
    <el-table
        v-bind="$attrs"
    >
      <template v-for="item in columns" :key="item.prop">
        <el-table-column
            type="selection"
            width="55"
            v-if="item.type === 'selection'"
            key="selection"
        >
        </el-table-column>
        <el-table-column
            v-else-if="!item.type"
            v-bind="item"
        >
        </el-table-column>
<!--        v-if="btn.visible"-->
        <el-table-column v-if="item.type === 'action'" v-bind="item" size="mini"  #default="scope">
          <template v-for="(btn,index) in item.list" :key="index" >
            <el-button :type="btn.type ||'text'" @click="handleAction(index, scope.row)">
              {{ btn.text }}
            </el-button>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!--    <el-pagination-->
    <!--        class="pagination"-->
    <!--        background-->
    <!--        layout="prev, pager, next, jumper"-->
    <!--        :total="pager.total"-->
    <!--        :page-size="pager.pageSize"-->
    <!--        @current-change="handleCurrentChange"-->
    <!--    />-->
  </div>
</template>
<script>
export default {
  name: 'BaseTable',
  props: ["columns"],
  setup(props, context) {
    const handleAction = (index, row) => {
      context.emit("handleAction", {index, row: {...row}})
    }
    return {
      handleAction
    }
  },
}
</script>
<style lang='scss' scoped>

</style>
