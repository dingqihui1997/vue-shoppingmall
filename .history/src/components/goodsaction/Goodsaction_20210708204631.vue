<template>
  <!-- 详情页底部购买按钮 -->
  <div>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon
        icon="cart-o"
        text="购物车"
        :badge="badge"
        @click="goto"
      />
      <van-goods-action-button type="warning" text="加入购物车" @click="add" />
      <van-goods-action-button
        type="danger"
        text="立即购买"
        @click="purchase"
      />
    </van-goods-action>
    <van-dialog v-model="show" show-cancel-button @confirm="confirm" allow-html>
      <div class="dialog1">
        <div class="dialog flex-ja font18">登录后才可使用此功能</div>
        <div class="dialog2 flex-ja">是否跳转登录/注册页面</div>
      </div>
    </van-dialog>
    <!-- 点击购买弹窗 -->
    <van-popup
      v-model="falg"
      closeable
      close-icon="close"
      position="bottom"
      :style="{ height: '35%' }"
    >
      <div class="popup flex-d">
        <div class="flex-a">
          <div><img :src="goodsOne.image_path" /></div>
          <div class="name">
            <div>{{ goodsOne.name }}</div>
            <div class="price">{{ "￥" + goodsOne.present_price }}</div>
          </div>
        </div>
        <div class="flex-sb num">
          <div class="mat10">
            <div class="amount">购买数量：</div>
            <div class="surplus">
              剩余{{ goodsOne.amount }} <span>每人限购50件</span>
            </div>
          </div>
          <div class="flex-a padr10">
            <van-stepper v-model="count" min="1" max="50" />
          </div>
        </div>
        <div class="butt flex-ja" @click="buy">立即购买</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    goodsOne: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      falg: false, //控制点击购买的弹窗
      show: false, //控制点击没登录时的弹窗
      count: "", //选择结算数量
      num: "", //控制标徽
    };
  },
  components: {},
  methods: {
    goto() {
      //点击购物车角标然后跳转购物车页面
      this.$router.push("/cart");
    },
    confirm() {
      this.$router.push("/register");
    }, //没登录弹框点击确认跳登录
    add(item) {
      //点击购物车判断是否登录
      if (!localStorage.getItem("name")) {
        //如果没登录就提示用户
        this.show = true;
      } else {
        //如果登录就加入购物车，发请求加购商品
        this.$api
          .addShop(this.goodsOne.id)
          .then((res) => {
            // console.log(res);
            if (res.code === 200) {
              //加入成功
              this.$toast(res.msg);
              this.$api
                .getCard() //加入成功获取购物车里面的数据
                .then((res) => {
                  //   console.log(res);
                  localStorage.setItem("num", res.shopList.length);
                  this.$store.commit("setBadge", res.shopList.length); //修改共享数据
                })
                .catch((err) => {
                  console.log("请求失败", err);
                });
            }
          })
          .catch((err) => {
            console.log("请求失败", err);
          });
      }
    }, //点击购物车
    purchase() {
      this.falg = true;
    }, //点击立即购买控制弹窗
    buy() {
      //点击弹窗立即购买跳结算页面
      if (!localStorage.getItem("name")) {
        //如果没登录就提示用户
        this.show = true;
      } else {
        this.$set(this.goodsOne, "count", this.count); //给详情新增属性数量属性
        this.$set(this.goodsOne, "cid", this.goodsOne.id);
        console.log(this.goodsOne);
        let arr = [];
        arr.push(this.goodsOne); //储存为一个数组
        localStorage.setItem("commodity", JSON.stringify(arr));
        localStorage.setItem("idDirect", 1);
        this.$router.push("/settlement");
      }
    },
  },
  mounted() {},
  computed: {
    badge() {
      //登录了才获取本地储存的值

      return this.$store.state.badge; //获取加购的数量
    },
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
.popup {
  width: 100%;
  height: 100%;
  img {
    width: 85px;
    height: 85px;
    border: 1px solid #eee;
    margin-top: 10px;
    margin-left: 15px;
  }
}
.name {
  margin-left: 10px;
  font-size: 14px;
}
.price {
  margin-top: 15px;
  color: #ff4444;
}
.amount {
  margin-bottom: 5px;
  font-size: 14px;
}
span {
  color: #ff4444;
}
.surplus {
  color: #666;
  font-size: 12px;
}
.num {
  width: 100%;
  height: 60px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding-left: 15px;
  padding-left: 10px;
  margin-top: 5px;
}
.butt {
  width: 100%;
  height: 40px;
  background: #ff4444;
  color: #fff;
  margin-top: 30px;
}
</style>