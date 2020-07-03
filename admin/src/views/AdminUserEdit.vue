<template>
  <div>
    <h1>{{ header }}</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: String
  },
  data: () => ({
    model: {}
  }),
  computed: {
    header () {
      return (this.id ? '编辑' : '创建') + '管理员'
    }
  },
  created() {
    this.id && this.fetch();
  },
  methods: {
    async save () {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/admin_users/${this.id}`, this.model);
      } else {
        res = await this.$http.post('rest/admin_users', this.model);
      }
      if (!res) return;
      this.$router.push('/admin_users/list');
      this.$message({
        message: '提交成功',
        type: 'success'
      })
    },
    async fetch () {
      const res = await this.$http.get(`rest/admin_users/${this.id}`);
      this.model = res.data;
    }
  }
}
</script>