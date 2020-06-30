<template>
  <div>
    <h1>创建分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data: () => ({
    model: {}
  }),
  methods: {
    async save () {
      console.log(123);
      const res = await this.$http.post('categories', this.model)
      this.$router.push('/categories/list');
      console.log(res);
      this.$message({
        message: '提交成功',
        type: 'success'
      })
    }
  }
}
</script>