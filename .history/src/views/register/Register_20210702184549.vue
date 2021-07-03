<template>
  <!-- 注册登录页面 -->
  <div>
    <div class="box login">
      <div class="top flex-ja"><van-icon name="arrow-left" /></div>
      <div class="text flex-d">
        <div class="title">登录 / 注册</div>
        <van-form @submit="onSubmit">
          <div class="ipt flex-a">
            <van-field
              v-model="username"
              placeholder="USERNAME"
              :rules="[{ required: true, message: '请填写用户名' }]"
            />
          </div>
          <div class="ipt flex-a">
            <van-field
              v-model="password"
              placeholder="PASSWORD"
              :rules="[{ required: true, message: '请填写密码' }]"
            />
          </div>
          <div class="ipt flex-a">
            <van-field
              v-model="text"
              placeholder="仅注册需要"
              label="手机号码"
              size="large"
            />
          </div>
          <div class="Short flex-a">
            <van-field
              v-model="text"
              placeholder="仅注册需要"
              label="短信验证码"
              :border="false"
            />
            <button class="but">发送验证码</button>
          </div>
          <div class="Code flex">
            <van-field
              placeholder="仅注册需要"
              label="验证码"
              :border="false"
              :rules="[{ required: true, message: '请填写验证码' }]"
            />

            <div class="captcha">9</div>
          </div>
        </van-form>
        <div class="flex-ja border1"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      username: "",
      password: "",
    };
  },
  components: {},
  methods: {},
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  height: 100vh;
  background-color: aqua;
  background-image: url("../../assets/login.jpg");
  padding-top: 5px;
}
.top {
  height: 35px;
  width: 35px;
  background: #737477;
  border-radius: 100%;
  color: #fff;
  margin-left: 10px;
}
.text {
  height: 500px;
  width: 350px;
  background-color: #fff;
  margin: auto;
  margin-top: 90px;
  padding: 10px;
}
.title {
  font-size: 24px;
}
.ipt {
  height: 80px;
  border-bottom: 2px #ededed solid;
}
.but {
  width: 100px;
  height: 30px;
  background-color: #07c160;
  font-size: 14px;
  color: #fff;
  border: none;
  padding: 2px;
}
.Short {
  height: 50px;
  border-bottom: 2px #ededed solid;
}
.Code {
  height: 60px;
  padding-top: 30px;
}
.van-field__control {
  border: 1px solid #ededed;
}
.border1 {
  width: 140px;
  height: 1px;
  background-color: #ededed;
  position: relative;
  left: 90px;
}
.captcha {
  width: 100px;
  height: 40px;
  background-color: aqua;
  position: relative;
  top: -10px;
}
</style>