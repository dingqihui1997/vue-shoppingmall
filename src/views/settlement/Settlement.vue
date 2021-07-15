<template>
  <!-- 订单结算 -->
  <div class="settlement">
    <top>
      <template #left
        ><van-icon name="arrow-left" class="leftarrow" @click="back"
      /></template>
      <template #center>订单结算</template>
    </top>
    <div
      class="box flex-a"
      v-if="Object.keys(list).length !== 0"
      @click="choice"
    >
      <div><van-icon name="location-o" class="icono" /></div>
      <div class="name flex-d">
        <div class="flex-sb tel">
          <div>收货人：{{ list.name }}</div>
          <div>{{ list.tel }}</div>
        </div>
        <div class="flex-sb tel">
          <div>收货地址：{{ list.address }}</div>
          <div><van-icon name="arrow" /></div>
        </div>
      </div>
    </div>
    <div class="box flex-a" v-else>
      <div><van-icon name="location-o" class="icono" /></div>
      <div class="name flex-d">
        <div class="flex-sb tel">
          暂无收货地址请先添加哦
          <div><van-icon name="arrow" @click="choice" /></div>
        </div>
      </div>
    </div>
    <div class="img"><img src="../../assets/caitiao.jpg" class="img100" /></div>
    <div v-for="(item, index) in arr" :key="index">
      <van-card
        :num="item.count"
        :price="item.present_price"
        :title="item.name"
        :thumb="item.image_path"
      />
    </div>
    <van-submit-bar
      :price="num * 100"
      button-text="提交订单"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      list: {}, //地址信息
      arr: [], //商品信息
      id: [], //结算时传的id数组:[]
      count: null, //
    };
  },
  components: {},
  methods: {
    obtain() {
      //获取默认地址
      this.$api
        .getDefaultAddress()
        .then((res) => {
          if (res.defaultAdd) {
            //如果用户有默认地址，就选择默认地址
            this.list = res.defaultAdd;
          } else {
            //没有默认地址，就调用地址列表，选择第一个地址
            this.getAddress();
          }
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
      if (localStorage.getItem("cart")) {
        //如果有值就是从详情直接购买过来的，返回详情
        this.$router.push({ path: "/details", query: { id: this.arr[0].id } }); //返回详情就清除
      } else {
        this.$router.push("/cart");
        //没有就是从购物车购买的，就返回购物车，
      } //返回上一级
      localStorage.removeItem("cart");
    },
    onSubmit() {
      //结算按钮
      if (Object.keys(this.list).length === 0) {
        //如果用户没有地址点击提交提醒用户
        this.$toast("请添加收货地址哦");
      } else {
        this.count = this.arr[0].count;
        localStorage.getItem("idDirect"); //获取储存的值来区分是购物车还是直接购买
        let buer = Boolean(Number(localStorage.getItem("idDirect"))); //
        //   console.log(buer);
        this.arr.map((item) => {
          this.id.push(item.cid);
        });
        this.$api
          .placeOrder({
            address: this.list.address, //详细地址
            tel: this.list.tel, //电话
            orderId: this.id, //所有商品的id数组
            totalPrice: this.num, //总价格价格
            idDirect: buer, // 直接购购买还是购物车页面
            count: this.count, //数量
          })
          .then((res) => {
            // console.log(res);
            if (res.code === 200) {
              this.$toast("结算完成");
              this.$router.push("/Order"); //结算成功，跳转已完成页面
              if (!buer) {
                let num = this.$store.state.badge; //修改购物车的数量，
                num = num - this.arr.length; //用原有的值减去结算了的值，并修改
                localStorage.setItem("num", num);
                this.$store.commit("setBadge", num);
              }
            }
          })
          .catch((err) => {
            console.log("请求失败", err);
          });
      }
    },
    getAddress() {
      //获取用户的地址
      this.$api
        .getAddress()
        .then((res) => {
          // console.log(res.address); //没有默认地址，就获取地址列表里面的第一个地址
          if (res.address.length !== 0) {
            this.list = res.address[0];
          } else {
            //如果地址列表为空，那就赋值空，提醒用户新增地址
            this.list = {};
          }
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    }, //获取用户地址列表
  },
  mounted() {
    //用户购买时选择结算地址
    if (!localStorage.getItem("Address")) {
      //如果本地没储存值，就调用默认地址
      this.obtain();
    } else {
      //有值就用本地储存
      this.list = JSON.parse(localStorage.getItem("Address"));
    }
    localStorage.removeItem("Address");
    this.arr = JSON.parse(localStorage.getItem("commodity")); //商品信息
  },
  computed: {
    num() {
      //总价格
      let sum = 0;
      this.arr.map((item) => {
        sum += item.count * item.present_price;
      });
      return sum;
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
