<template>
  <!-- 我的页面 -->
  <div>
    <top><template #center>会员中心</template></top>
    <div class="box">
      <div class="setup">
        <van-icon name="setting" @click="goto('/setup')" />
      </div>
      <div class="flex-ja wi100">
        <img src="../../assets/icon.svg" alt="" />
      </div>
      <div class="welcome flex-ja wi100" v-if="userInfo">
        欢迎您：{{ userInfo.nickname }}
      </div>
      <div
        class="out flex-ja wi100"
        v-html="userInfo ? '退出登录' : '注册/登录'"
        @click="out('/register')"
      ></div>
    </div>
    <div class="van flex-a wi100">
      <div class="flex1 flex-di">
        <van-icon name="pending-payment" class="icon" />
        <div class="one">待付款</div>
      </div>
      <div class="flex1 flex-di">
        <van-icon name="todo-list-o" class="icon" />
        <div class="one">待发货</div>
      </div>
      <div class="flex1 flex-di">
        <van-icon name="logistics" class="icon" />
        <div class="one">待收货</div>
      </div>
      <div class="flex1 flex-di" @click="goto('/evaluate')">
        <van-icon name="records" class="icon" />
        <div class="one">评价</div>
      </div>
      <div class="flex1 flex-di" @click="goto('/order')">
        <van-icon name="points" class="icon" />
        <div class="one">已完成</div>
      </div>
    </div>
    <div class="order wi100 flex-sba" @click="goto('/order')">
      <div class="all"><van-icon name="records" class="records" />全部订单</div>
      <div><van-icon name="arrow" /></div>
    </div>
    <div class="order wi100 flex-sba" @click="goto('/favorites')">
      <div class="all"><van-icon name="star-o" class="records" />收藏商品</div>
      <div><van-icon name="arrow" /></div>
    </div>
    <div class="order wi100 flex-sba" @click="goto('/address')">
      <div class="all">
        <van-icon name="location-o" class="records" />地址管理
      </div>
      <div><van-icon name="arrow" /></div>
    </div>
    <div class="order wi100 flex-sba" @click="goto('/browse')">
      <div class="all"><van-icon name="clock-o" class="records" />最近浏览</div>
      <div><van-icon name="arrow" /></div>
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
  props: {},
  data() {
    return {
      show: false,
      userInfo: "", //本地储存的值
    };
  },
  components: {},
  methods: {
    confirm() {
      this.$router.push("/register");
    },
    goto(url) {
      //跳转页面
      if (localStorage.getItem("name") === null) {
        this.show = true;
      } else {
        if (url === "/address") {
          localStorage.setItem("flag ", 0);
        }
        this.$router.push(url);
      }
    },
    out(url) {
      if (this.userInfo) {
        localStorage.removeItem("userInfo"); //当用户点击退出时，就清除本地数据
        localStorage.removeItem("name");
        this.$api
          .loginOut()
          .then((res) => {
            // console.log(res);
          })
          .catch((err) => {
            console.log("请求失败", err);
          });
        this.$router.push("/register");
      } else {
        this.$router.push("/register");
      }
    },
  },
  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log(this.userInfo); //获取用户储存的值
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  width: 100%;
  height: 210px;
  background: #e30c7b;
  color: #fff;
}
.setup {
  width: 100%;
  text-align: right;
  padding-top: 10px;
  padding-right: 10px;
  font-size: 24px;
}
.welcome {
  margin-top: 10px;
  font-size: 20px;
  font-weight: 700;
}
.out {
  margin-top: 10px;
}
.van {
  height: 80px;
  padding: 0 10px;
  .icon {
    font-size: 28px;
    color: #969796;
  }
  .one {
    margin-top: 5px;
    font-size: 14px;
  }
}
.order {
  height: 50px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding-left: 5px;
  padding-right: 5px;
  font-size: 14px;
  color: #333333;
}
.records {
  font-size: 24px;
  margin-right: 4px;
  position: relative;
  top: 5px;
}
.all {
  position: relative;
  top: -4px;
}
</style>