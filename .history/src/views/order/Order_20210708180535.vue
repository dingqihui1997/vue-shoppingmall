<template>
  <!-- 全部订单 和已完成 -->
  <div class="home">
    <top>
      <template #left
        ><van-icon name="arrow-left" class="leftarrow"
      /></template>
      <template #center>我的订单</template>
    </top>
    <div></div>
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
  methods: {
    getdata() {
      //获取用户订单数量
      this.$api
        .getOrderNum()
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
  },
  mounted() {
    this.getdata();
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.home {
  height: 100vh;
  background: #eee;
}
</style>