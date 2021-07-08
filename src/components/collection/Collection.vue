<template>
  <!-- 详情收藏 -->
  <div>
    <div class="amount flex-ja">
      <div class="left">运费:0</div>
      <div class="center">剩余：{{ goodsOne.amount }}</div>
      <div class="right flex">
        <div v-html="num ? '取消收藏' : '点击收藏'"></div>
        <div class="like">
          <van-icon
            name="like"
            @click="Collection"
            :class="{ love: num === 1 }"
          />
        </div>
      </div>
    </div>
    <van-dialog v-model="show" show-cancel-button @confirm="confirm" allow-html>
      <div class="dialog1">
        <div class="dialog flex-ja font18">登录后才可使用此功能</div>
        <div class="dialog2 flex-ja">是否跳转登录/注册页面</div>
      </div>
    </van-dialog>
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
      show: false,
      num: null, //是否收藏
    };
  },
  components: {},
  methods: {
    confirm() {
      this.$router.push("/register"); //没登陆时跳转
    },
    Collection() {
      if (localStorage.getItem("name") === null) {
        //没登陆就提示
        this.show = true;
      } else {
        //登录储存有值就判断是否收藏
        if (this.num === 0) {
          //num是0就没收藏，点击就变成收藏
          this.num = 1;
          this.$api
            .collection(this.goodsOne)
            .then((res) => {
              //   console.log(res);
              if (res.code === 200) {
                //收藏成功就提示
                this.$toast(res.msg);
              }
            })
            .catch((err) => {
              console.log("请求失败", err);
            });
        } else if (this.num === 1) {
          //取消收藏
          this.num = 0;
          this.$api
            .cancelCollection(this.goodsOne.id)
            .then((res) => {
              //   console.log(res);
              if (res.code === 200) {
                this.$toast(res.msg);
              }
            })
            .catch((err) => {
              console.log("请求失败", err);
            });
        }
      }
    },
  },
  mounted() {
    this.$api //查询商品是否收藏
      .isCollection(this.goodsOne.id)
      .then((res) => {
        this.num = res.isCollection; //判断是否收藏
      })
      .catch((err) => {
        console.log("请求失败", err);
      });
    // console.log(this.goodsOne);
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.amount {
  position: relative;
  height: 40px;
  color: #999999;
  font-size: 14px;
  border-bottom: 1px solid #f8f8f8;
  .right {
    position: absolute;
    right: 10px;
    .van-icon-like {
      font-size: 20px;
      position: relative;
      top: 5px;
    }
  }
  .left {
    position: absolute;
    left: 0;
  }
  .like {
    position: relative;
    top: -5px;
    margin-left: 5px;
  }
}
.love {
  color: #ff0000;
}
</style>