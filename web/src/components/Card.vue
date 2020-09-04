<template>
  <div class="card mt-3 bg-white p-3 border-bottom">
    <div class="card-header d-flex ai-center" :class="{'border-bottom': !plain, 'pb-3': !plain}">
      <div class="iconfont" :class="`icon-${icon}`"></div>
      <div class="fs-xl flex-1 px-2">{{title}}</div>
      <div class="iconfont icon-menu" v-if="!plain"></div>
    </div>
    <div class="card-body pt-3">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    plain: {
      type: Boolean
    }
  }
}
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";
.card {
  border-bottom: 1px solid $border-color;
}
</style>