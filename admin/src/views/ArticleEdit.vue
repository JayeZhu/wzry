<template>
  <div>
    <h1>{{ header }}</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor
          v-model="model.body"
          useCustomImageHandler
          @image-added="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor} from 'vue2-editor'; // 富文本编辑器
export default {
  props: {
    id: {}
  },
  components: {
    VueEditor
  },
  data: () => ({
    model: {},
    categories: []
  }),
  computed: {
    header () {
      return (this.id ? '编辑' : '创建') + '文章'
    }
  },
  created() {
    this.fetchCategories();
    this.id && this.fetch();
  },
  methods: {
    async save () {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/articles/${this.id}`, this.model);
      } else {
        res = await this.$http.post('rest/articles', this.model);
      }
      if (!res) return;
      this.$router.push('/articles/list');
      this.$message({
        message: '提交成功',
        type: 'success'
      })
    },
    async fetch () {
      const res = await this.$http.get(`rest/articles/${this.id}`);
      this.model = res.data;
    },
    async fetchCategories () {
      const res = await this.$http.get(`rest/categories`);
      this.categories = res.data;
    },
    // 文件上传
    async handleImageAdded (file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)
 
      const formData = new FormData();
      formData.append("file", file);
 
      const res = await this.$http.post('upload', formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    }
  }
}
</script>