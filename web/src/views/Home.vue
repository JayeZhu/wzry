<template>
  <div class="home">
    <swiper :options="swiperOptions">
      <swiper-slide><img class="w-100" src="../assets/images/210794580bb9303653804bb7b482f2a4.jpeg" alt="" srcset=""></swiper-slide>
      <swiper-slide><img class="w-100" src="../assets/images/ddc8c8922cbb694dfb73c86bb03fce22.jpeg" alt="" srcset=""></swiper-slide>
      <swiper-slide><img class="w-100" src="../assets/images/b9905b35bb0afa9050d9ddbe04d82d29.jpeg" alt="" srcset=""></swiper-slide>
      <div class="swiper-pagination pagination-home text-right" slot="pagination"></div>
    </swiper>
    <!-- end-of-swiper -->
    <div class="nav-icons bg-white mt-3 text-center pt-3 text-grey-1">
      <div v-show="showItems" class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="n in navItems" :key="n.icon">
          <i class="sprite sprite-item" :class="`sprite-${n.icon}`"></i>
          <div class="py-2">{{ n.text }}</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm" @click="showItems=!showItems">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- end-of-nav-items -->
    <m-list-card title="新闻资讯" icon="menu1" :categories="newsCats">
      <template #items="{category}">
        <router-link
          tag="div"
          class="py-2 d-flex"
          :to="`/articles/${item._id}`"
          v-for="(item, i) in category.newsList"
          :key="i"
        >
          <span class="text-info">[{{item.categoryName}}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{item.title}}</span>
          <span class="text-grey-1 fs-sm">{{item.createdAt | date}}</span>
        </router-link>
      </template>
    </m-list-card>

    <m-list-card title="英雄列表" icon="menu1" :categories="heroCats">
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem">
          <router-link tag="div" :to="`/heroes/${hero._id}`" class="p-2 text-center" style="width:20%" v-for="(hero, i) in category.heroList" :key="i">
            <img :src="hero.avatar" class="w-100" alt="">
            <div>{{hero.name}}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>
    <p></p>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  filters: {
    date (val) {
      return dayjs(val).format("MM/DD");
    }
  },
  name: 'Home',
  data: () => ({
    showItems: true,
    swiperOptions: {
      pagination: {
        el: '.pagination-home'
      },
      loop: true,
      autoplay: true,
      autoplayDisableOnInteraction: false,
    },
    navItems: [
      { icon: 'news', text: '爆料站' },
      { icon: 'story', text: '故事站' },
      { icon: 'mall', text: '周边商城' },
      { icon: 'experience', text: '体验服' },
      { icon: 'newcomer', text: '新人专区' },
      { icon: 'inherited', text: '荣耀传承' },
      { icon: 'colleague', text: '同人专区' },
      { icon: 'camp', text: '王者营地' },
      { icon: 'public', text: '公众号' },
      { icon: 'version', text: '版本介绍' },
    ],
    newsCats: [],
    heroCats: []
  }),
  created () {
    this.fetchNewCats();
    this.fetchHeroCats();
  },
  methods: {
    async fetchNewCats () {
      const res = await this.$http.get('news/list');
      res.data.splice(1, 1);
      console.log(res.data);
      this.newsCats = res.data;
    },
    async fetchHeroCats () {
      const res = await this.$http.get('heroes/list');
      console.log(res.data);
      this.heroCats = res.data;
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/variables';
.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
}
.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
</style>
