<template>
  <div class="page-article" v-if="model">
    <div class="d-flex border-bottom py-2">
      <div class="iconfont icon-Back text-blue" @click="$router.push('/')"></div>
      <div class="flex-1 text-blue pl-2">
        <strong>{{model.title}}</strong>
      </div>
      <div class="text-grey fs-xs">{{model.createdAt | date}}</div>
    </div>
    <div v-html="model.body" class="px-3 fs-lg body"></div>
    <div class="px-3 border-top">
      <div class="d-flex ai-center">
        <i class="iconfont icon-menu1"></i>
        <strong class="text-blue fs-lg ml-1">相关资讯</strong>
      </div>
      <div class="pt-2 fs-lg">
        <router-link
          class="pt-1"
          tag="div"
          v-for="item in model.related"
          :key="item._id"
          :to="`/articles/${item._id}`"
        >
          {{ item.title }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  filters: {
    date (val) {
      return dayjs(val).format("YYYY/MM/DD");
    }
  },
  props: {
    id: { require: true }
  },
  data: () => ({
    model: null
  }),
  created () {
    this.fetch();
  },
  watch: {
    id () {
      this.fetch()
    }
  },
  methods: {
    async fetch () {
      const res = await this.$http.get(`articles/${this.id}`)
      this.model = res.data;
    }
  }
}
</script>

<style lang="scss">
.page-article {
  .icon-Back {
    font-size: 1.5rem;
  }
  .body {
    img {
      max-width: 100%;
      height: auto;
    }
    iframe {
      max-height: 100%;
      height: auto;
    }
  }
}
</style>
