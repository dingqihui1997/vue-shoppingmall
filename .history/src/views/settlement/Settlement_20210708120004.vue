<template>
  <!-- 订单结算 -->
  <div>
    <top>
      <template #left
        ><van-icon name="arrow-left" class="leftarrow"
      /></template>
      <template #center>订单结算</template>
    </top>
    <div class="box flex-a">
      <div><van-icon name="location-o" class="icono" /></div>
      <div class="name flex-d">
        <div class="flex-sb tel">
          <div>收货人：{{ list.name }}</div>
          <div>{{ list.tel }}</div>
        </div>
        <div class="flex-sb tel">
          <div>收货地址：{{ list.address }}</div>
          <div><van-icon name="arrow" @click="choice" /></div>
        </div>
      </div>
    </div>
    <div class="img"><img src="../../assets/caitiao.jpg" class="img100" /></div>
    <van-card
      num="2"
      price="2.00"
      desc="描述信息"
      title="商品标题"
      thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
    />
    <van-submit-bar :price="3050" button-text="提交订单" />
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      list: {},
    };
  },
  components: {},
  methods: {
    obtain() {
      //获取默认地址
      this.$api
        .getDefaultAddress()
        .then((res) => {
          this.list = res.defaultAdd;
          console.log(this.list);
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
    choice() {
      //选择地址
      this.$router.push("/address");
    },
  },
  mounted() {
    this.obtain();
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  height: 100px;
  width: 100%;
  border-top: 1px solid #eee;
}
.img {
  height: 5px;
  width: 100%;
}
.icono {
  font-size: 30px;
  margin-left: 10px;
}
.name {
  font-size: 14px;
  margin-left: 10px;
  width: 310px;
  .tel {
    margin-top: 10px;
  }
}
.van-button {
  border-radius: 0;
}
</style>
