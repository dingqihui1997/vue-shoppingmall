<template>
  <!-- 订单结算 -->
  <div class="settlement">
    <top>
      <template #left
        ><van-icon name="arrow-left" class="leftarrow" @click="back"
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
    <div v-for="(item, index) in arr" :key="index">
      <van-card
        :num="item.count"
        :price="item.mallPrice"
        :title="item.name"
        :thumb="item.image_path"
      />
    </div>
    <van-submit-bar :price="num" button-text="提交订单" />
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      list: {},
      arr: [],
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
          //   console.log(this.list);
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
    choice() {
      //选择地址
      this.$router.push("/address");
    },
    back() {
      this.$router.back();
    },
  },
  mounted() {
    this.obtain();
    this.list = JSON.parse(localStorage.getItem("Address"));
    if (localStorage.getItem("commodity")) {
      this.list = JSON.parse(localStorage.getItem("Address"));
    } else {
      this.obtain();
    }

    this.arr = JSON.parse(localStorage.getItem("commodity")); //商品信息
    console.log(JSON.parse(localStorage.getItem("Address")));
  },
  computed: {
    num() {
      let sum = 0;
      this.arr.map((item) => {
        sum += item.count * item.mallPrice;
      });
      return sum * 100;
    },
  },
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
.van-submit-bar__bar {
  padding-right: 0;
  padding-bottom: 0;
}
.settlement {
  .van-card__thumb {
    border: 1px solid #eee;
  }
  .van-card {
    background: #fff;
    border-bottom: 1px solid #eee;
  }
}
</style>
