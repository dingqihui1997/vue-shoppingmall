<template>
  <!-- 公共头部 -->
  <div>
    <div class="box flex-ja">
      <div class="left"><slot name="left"></slot></div>
      <div class="center"><slot name="center"></slot></div>
      <div class="right"><slot name="right"></slot></div>
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
  height: 45px;
  background-color: #fff;
  position: relative;
  top: 0;
}
.left {
  position: absolute;
  left: 10px;
}

.right {
  position: absolute;
  right: 10px;
}
</style>