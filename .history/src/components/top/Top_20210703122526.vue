<template>
  <!-- 公共头部 -->
  <div>
    <div class="box">
      <slot name="left"></slot>
      <slot name="left"></slot>
      <slot name="right"></slot>
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
.box {
  width: 100%;
  height: 40px;
  background-color: greenyellow;
}
</style>