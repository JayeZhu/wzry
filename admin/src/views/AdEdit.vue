<template>
  <div>
    <h1>{{ header }}</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="model.items.push({})"><i class="el-icon-plus"></i>添加广告</el-button>
        <el-row type="flex" style="flex-wrap: wrap">
          <el-col :md="24" v-for="(item, i) in model.items" :key="i">
            <el-form-item label="跳转链接">
              <el-input v-model="item.url"></el-input>
            </el-form-item>
            <el-form-item label="图片" style="margin-top:10px">
              <el-upload
                class="avatar-uploader"
                :action="imgAction"
                :show-file-list="false"
                :on-success="res => $set(item, 'image', res.url)">
                <img v-if="item.image" :src="item.image" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="danger" @click="model.items.splice(i, 1)">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
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
    model: {
      items: []
    },
  }),
  computed: {
    header () {
      return (this.id ? '编辑' : '创建') + '广告位'
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
        res = await this.$http.put(`rest/ads/${this.id}`, this.model);
      } else {
        res = await this.$http.post('rest/ads', this.model);
      }
      if (!res) return;
      this.$router.push('/ads/list');
      this.$message({
        message: '提交成功',
        type: 'success'
      })
    },
    async fetch () {
      const res = await this.$http.get(`rest/ads/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
    }
  }
}
</script>