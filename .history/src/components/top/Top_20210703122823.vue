<template>
  <!-- 公共头部 -->
  <div>
    <div class="box flex-ja">
      <div class="left"><slot name="left"></slot></div>
      <div class="center"><slot name="left"></slot></div>
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
  height: 40px;
  background-color: greenyellow;
  position: relative;
  padding: 0 10px;
}
.left {
  position: absolute;
  left: 0;
}
.rigth {
  position: absolute;
  right: ;
  :0 ;
}
</style>