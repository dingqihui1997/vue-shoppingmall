<template>
  <!-- 购物车页面 -->
  <div>
    <!-- 顶部 -->
    <div class="van">
      <van-sticky>
        <top>
          <template #center> 购物车 </template>
        </top>
      </van-sticky>
    </div>
    <!-- 没有登录的状态 -->
    <div v-if="flag">
      <div class="img"><img src="../../assets/order.gif" class="img100" /></div>
      <div class="flex-ja shopping">登录后才能查看购物车</div>
      <div class="flex-ja">
        <van-button type="primary" @click="click">立即登录</van-button>
      </div>
    </div>
    <div v-else>
      <!-- 已登录但没有商品 -->
      <div v-if="shopList.length === 0">
        <div class="flex-ja font">
          <div class="icon"><van-icon name="cart-o" class="flex-ja" /></div>
        </div>
        <div class="flex-ja none" @click="goto">您的购物车还是空的</div>
        <div class="flex-ja">
          <div class="goto flex-ja">去购物</div>
        </div>
      </div>
      <div v-if="shopList.length !== 0">
        <cartnum
          v-if="shopList.length !== 0"
          :shopList="shopList"
          @shop="shop"
        ></cartnum>
      </div>
    </div>
  </div>
</template>

<script>
import Cartnum from "../../components/cartnum/Cartnum.vue";
export default {
  name: "",
  props: {},
  data() {
    return {
      flag: false, //储存的用户名
      shopList: [], //购物车数据
    };
  },
  components: { Cartnum },
  methods: {
    click() {
      //点击登录
      this.$router.push("/register");
    },
    shop() {
      this.shopList = this.shopList.filter((item) => {
        return item.check === false;
      });
      localStorage.setItem("num", this.shopList.length);
      this.$store.commit("setBadge", this.shopList.length);
    },
  },
  mounted() {
    if (!localStorage.getItem("name")) {
      this.flag = true;
    }
    this.name = localStorage.getItem("name"); //先获取存储的值没有储存表示没登录，就显示没登录状态
    this.$api
      .getCard() //加入成功获取购物车里面的数据
      .then((res) => {
        // console.log(res);
        this.shopList = res.shopList;
        // console.log(this.shopList);
      })
      .catch((err) => {
        console.log("请求失败", err);
      });
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.img {
  border-top: 1px solid #eee;
  width: 100%;
  height: 300px;
}
.shopping {
  margin-bottom: 10px;
}

.icon {
  width: 200px;
  height: 200px;
  border-radius: 100%;
  background: #e8ebe4;
}
.van-icon-cart-o {
  font-size: 120px;
  color: #cf3b1f;
  position: relative;
  top: 30px;
  left: 40px;
}
.font {
  border-top: 1px solid #eee;
  padding: 30px;
  width: 100%;
}
.goto {
  margin-top: 15px;
  width: 100px;
  height: 35px;
  border: 1px #767877 solid;
  border-radius: 15px;
}
.none {
  color: #666;
  font-size: 20px;
}
.van {
  background: #eee !important;
}
</style>