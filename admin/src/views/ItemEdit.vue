<template>
  <div>
    <h1>{{ header }}</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
          class="avatar-uploader"
          :action="imgAction"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="afterUpload">
          <img v-if="model.icon" :src="model.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
    model: {},
  }),
  computed: {
    header () {
      return (this.id ? '编辑' : '创建') + '物品'
    },
    imgAction () {
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  created() {
    this.id && this.fetch();
  },
  methods: {
    async save () {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/items/${this.id}`, this.model);
      } else {
        res = await this.$http.post('rest/items', this.model);
      }
      if (!res) return;
      this.$router.push('/items/list');
      this.$message({
        message: '提交成功',
        type: 'success'
      })
    },
    async fetch () {
      const res = await this.$http.get(`rest/items/${this.id}`);
      this.model = res.data;
    },
    afterUpload (res) {
      console.log(res);
      // 数据赋值会有问题，需要显式赋值
      // this.model.icon = res.url; // 获取后台生成的url，赋值给model.icon
      this.$set(this.model, 'icon', res.url); // vue推荐用法
      // this.model = { icon: res.url}; // 更改对象
    }
  }
}
</script>