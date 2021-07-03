<template>
  <!-- 公共头部 -->
  <div>
    <div>
      <!-- <slot name="left"></slot>
      <slot name="left"></slot>
      <slot name="right"></slot> -->
      <van-nav-bar title="标题" left-text="返回" left-arrow>
        <template #right>
          <van-icon name="" size="18" />
        </template>
      </van-nav-bar>
    </div>
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