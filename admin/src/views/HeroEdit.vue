<template>
  <div>
    <h1>{{ header }}</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs type="border-card" value="skills">
        <el-tab-pane label="基本信息" name="basic">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="imgAction"
              :show-file-list="false"
              :on-success="afterUpload">
              <img v-if="model.avatar" :src="model.avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="item of categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate v-model="model.scores.difficult" :max="10" show-score style="margin-top:0.6rem"></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate v-model="model.scores.skills" :max="10" show-score style="margin-top:0.6rem"></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate v-model="model.scores.attack" :max="10" show-score style="margin-top:0.6rem"></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate v-model="model.scores.survive" :max="10" show-score style="margin-top:0.6rem"></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple>
              <el-option
                v-for="item of items"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple>
              <el-option
                v-for="item of items"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="skills">
          <el-button size="small" @click="model.skills.push({})"><i class="el-icon-plus"></i>添加技能</el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(item, i) in model.skills" :key="i">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="头像">
                <el-upload
                  class="avatar-uploader"
                  :action="imgAction"
                  :show-file-list="false"
                  :on-success="res => $set(item, 'icon', res.url)">
                  <img v-if="item.icon" :src="item.icon" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input type="textarea" v-model="item.tips"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="danger" @click="model.skills.splice(i, 1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="margin-top:1rem">
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
      name: '',
      avatar: '',
      categories: [],
      scores: {
        difficult: 0,
        skills: 0,
        attack: 0,
        survive: 0
      },
      items1: [],
      items2: [],
      skills: []
    },
    categories: [],
    items: []
  }),
  computed: {
    header () {
      return (this.id ? '编辑' : '创建') + '英雄'
    },
    imgAction () {
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  created() {
    this.id && this.fetch();
    this.fetchCategories();
    this.fetchItems();
  },
  methods: {
    async save () {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/heroes/${this.id}`, this.model);
      } else {
        res = await this.$http.post('rest/heroes', this.model);
      }
      if (!res) return;
      this.$router.push('/heroes/list');
      this.$message({
        message: '提交成功',
        type: 'success'
      })
    },
    async fetch () {
      const res = await this.$http.get(`rest/heroes/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
    },
    async fetchCategories () {
      const res = await this.$http.get('rest/categories');
      this.categories = res.data;
    },
    async fetchItems () {
      const res = await this.$http.get('rest/items');
      this.items = res.data;
    },
    afterUpload (res) {
      this.model.avatar = res.url
    }
  }
}
</script>