<template>
  <!-- 底部样式 -->
  <div>
    <router-view />
    <van-tabbar
      v-model="active"
      active-color="#ee0a24"
      inactive-color="#000"
      fixed
      :placeholder="true"
      route
    >
      <van-tabbar-item icon="wap-home-o" replace to="/">商城</van-tabbar-item>
      <van-tabbar-item icon="wap-nav" replace to="/classification"
        >分类</van-tabbar-item
      >
      <div>
        <van-tabbar-item icon="cart" :badge="badge" replace to="/cart"
          >购物车</van-tabbar-item
        >
      </div>
      <div>
        <van-tabbar-item icon="cart" :badge="badge" replace to="/cart"
          >购物车</van-tabbar-item
        >
      </div>
      <van-tabbar-item icon="contact" replace to="/my">我的</van-tabbar-item>
    </van-tabbar>
    <van-dialog
      v-model="show"
      title="标题"
      show-cancel-button
      @confirm="confirm"
    ></van-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      active: 0,
      show: false,
      num: "", //控制购物车图标
    };
  },
  components: {},
  methods: {
    confirm() {
      console.log(222);
      this.$router.push("/register");
    },
    cancel() {},
  },
  mounted() {},
  computed: {
    badge() {
      this.$store.state.badge; //获取加购的数量
    },
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
</style>