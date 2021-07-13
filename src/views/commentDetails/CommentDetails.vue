<template>
  <!-- 评论详情 -->
  <div>
    <top>
      <template #left
        ><van-icon name="arrow-left" class="leftarrow" @click="back"
      /></template>
      <template #center>评价详情</template>
    </top>
    <div class="box">
      <div class="flex-a rate">
        <div class="img">
          <img src="../../assets/icon.svg" class="img100" />
        </div>
        <div>
          <div v-if="anonymous" class="anonymous">匿名人士</div>
          <div v-else class="anonymous">{{ name }}</div>
          <div class="ratea"><van-rate v-model="obj.rate" /></div>
        </div>
        <div class="time">{{ obj.comment_time }}</div>
      </div>
      <div class="content">评价内容：{{ obj.content }}</div>
    </div>
    <div
      v-for="(item, index) in list"
      :key="index"
      class="flex list"
      @click="goto"
    >
      <img :src="item.image_path" />
      <div class="name">{{ item.name }}</div>
      <div class="flex-ja cart" @click.stop="add">
        <van-icon name="cart-o" />
      </div>
    </div>
    <div class="butt flex-ja" @click="back">返回</div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      goods: null, //已评价传递过来的数据
      obj: {}, //评价内容
      anonymous: null, //是否匿名
      name: "", //用户名
      list: [], //商品信息
    };
  },
  components: {},
  methods: {
    evaluateOne() {
      //获取单个评论
      this.$api
        .evaluateOne(this.goods.cid, this.goods._id)
        .then((res) => {
          this.obj = res.evaluateOne;
          console.log(this.obj);
          this.anonymous = this.obj.anonymous; //是否匿名
          this.name = this.obj.user[0].nickname; //用户名
          console.log(this.name);
          this.list = this.obj.goods;
          console.log(this.list);
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
    back() {
      //返回上一级
      this.$router.push("/evaluate");
    },
    goto() {
      //跳转详情
      this.$router.push({
        path: "/details",
        query: { id: this.obj.cid },
      });
    },
    add() {
      //加入购物车
      this.$api
        .addShop(this.obj.cid)
        .then((res) => {
          console.log(res);
          if (res.code === 200) {
            //加入成功
            this.$toast(res.msg);
            this.$api
              .getCard() //加入成功获取购物车里面的数据
              .then((res) => {
                console.log(res);
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
    },
  },
  mounted() {
    this.goods = JSON.parse(this.$route.query.goods);
    console.log(this.goods);
    this.evaluateOne();
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  width: 100%;
  height: 110px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}
.rate {
  height: 70px;
  width: 100%;
  .img {
    width: 70px;
    height: 70px;
    margin-left: 10px;
    margin-top: 10px;
  }
}
.anonymous {
  margin-left: 10px;
  font-size: 14px;
}
.ratea {
  margin-left: 10px;
  margin-top: 10px;
}
.time {
  font-size: 14px;
  margin-left: 30px;
}
.content {
  margin-top: 10px;
}
.list {
  height: 100px;
  width: 100%;
  margin-top: 10px;
  img {
    width: 80px;
    height: 80px;
  }
}
.name {
  width: 260px;
}
.cart {
  font-size: 24px;
  color: #ff5352;
  width: 35px;
  height: 35px;
  background: #ffe6e2;
  border-radius: 100%;
  text-align: center;
  position: relative;
  left: -5px;
  top: 25px;
}
.butt {
  width: 90%;
  height: 45px;
  background: #07c160;
  color: #fff;
  margin: 150px auto;
}
</style>