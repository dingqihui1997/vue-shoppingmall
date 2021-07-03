<template>
  <!-- 公共头部 -->
  <div>
    <van-nav-bar>
      <slot name="left"></slot>
      <slot name="left"></slot>
      <slot name="right"></slot>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  components: {},
  methods: {},
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
</style>