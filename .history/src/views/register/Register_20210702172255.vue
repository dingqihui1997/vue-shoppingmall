<template>
  <!-- 注册登录页面 -->
  <div>
    <div class="box">
      <div class="top flex-ja"><van-icon name="arrow-left" /></div>
      <div class="text flex-d">
        <div>登录 / 注册</div>
      </div>
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
  padding-top: 5px;
}
.top {
  height: 35px;
  width: 35px;
  background: #737477;
  border-radius: 100%;
  color: #fff;
  margin-left: 10px;
}
.text {
  height: 500px;
  width: 350px;
  background-color: #fff;
  margin: auto;
  margin-top: 90px;
  padding-left: 10px;
  padding-top: 10px;
}
</style>