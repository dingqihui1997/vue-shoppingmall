<template>
  <!-- 注册登录页面 -->
  <div>
    <div class="box">
      <div class="top"><van-icon name="arrow-left" /></div>
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
  height: 100vh;
  background-color: aqua;
  background-image: url("../../assets/login.jpg");
}
.top {
  height: 35px;
  width: 35px;
  background: #737477;
  border-radius: 100%;
  color: #fff;
  text-align: center;
}
</style>