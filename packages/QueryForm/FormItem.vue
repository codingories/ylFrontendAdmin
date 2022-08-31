<template>
  <div>
    <div class="query-form">
              <el-form-item label="用户ID" prop="userId">
                <el-input v-model="user.userId" placeholder="请输入用户ID"></el-input>
              </el-form-item>
    </div>
  </div>
</template>
<script>
export default {
  name: 'QueryForm',
  data(){
    return {

    }
  }
}
</script>
<style lang='scss' scoped>

</style>
