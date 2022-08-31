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
          v-else
          v-bind="item"
        >
        </el-table-column>
      </template>
<!--      <el-table-column-->
<!--          label="操作"-->
<!--          width="150">-->
<!--        <template #default="scope">-->
<!--          <el-button type="primary" @click="handleEdit(scope.row)">编辑</el-button>-->
<!--          <el-button type="danger" size="small" @click="handleDel(scope.row)">删除</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
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
  setup() {

  },
}
</script>
<style lang='scss' scoped>

</style>
