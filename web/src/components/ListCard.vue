<template>
  <m-card :icon="icon" :title="title">
    <div class="nav jc-between">
      <div class="nav-item" :class="{active: active === i}" v-for="(category, i) in categories" :key="i">
        <div class="nav-link" @click="active=i">{{category.name}}</div>
      </div>
    </div>
    <div class="pt-3">
      <swiper ref="swiper" @slide-change="() => active = $refs.swiper.swiper.realIndex">
        <swiper-slide v-for="(category, i) in categories" :key="i">
          <slot name="items" :category="category"></slot>
        </swiper-slide>
      </swiper>
    </div>
  </m-card>
</template>

<script>
export default {
  props: {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    categories: { type: Array, required: true },
  },
  data: () => ({
    active: 0
  })
};
</script>