<template>
  <div class="home">
    <swiper :options="swiperOptions">
      <swiper-slide><img class="w-100" src="../../public/images/210794580bb9303653804bb7b482f2a4.jpeg" alt="" srcset=""></swiper-slide>
      <swiper-slide><img class="w-100" src="../../public/images/ddc8c8922cbb694dfb73c86bb03fce22.jpeg" alt="" srcset=""></swiper-slide>
      <swiper-slide><img class="w-100" src="../../public/images/b9905b35bb0afa9050d9ddbe04d82d29.jpeg" alt="" srcset=""></swiper-slide>
      <div class="swiper-pagination pagination-home" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data: () => ({
    swiperOptions: {
      pagination: {
        el: '.pagination-home'
      }
    }
  })
}
</script>

<style lang="scss" scoped>
@import '../style.scss';
>>> .swiper-pagination-bullet {
  background-color: #fff !important;
}
.swiper-pagination {
  .swiper-pagination-bullet {
    background-color: #fff!important;
    &.swiper-pagination-bullet-active {
      background-color: map-get($colors, 'info') !important;
    }
  }
  text-align: right
}
</style>
