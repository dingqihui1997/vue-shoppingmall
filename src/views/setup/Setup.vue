<template>
  <!-- 设置修改个人信息 -->
  <div class="wi100 usename-box">
    <van-form @onSubmit="onSubmit">
      <!-- 顶部 -->
      <top>
        <template #left
          ><van-icon name="arrow-left" class="leftarrow" @click="back"
        /></template>
        <template #center>个人资料</template>
      </top>
      <div class="one flex-a">githu</div>
      <div class="flex-sba portrait">
        <div>头像</div>
        <div>
          <img src="../../assets/icon.svg" />
          <van-icon name="arrow" class="arrow" />
        </div>
      </div>
      <!-- 用户名 -->
      <div class="one flex-a">
        <div class="user">用户名</div>
        <van-field
          v-model="userInfo.nickname"
          placeholder="请输入用户名"
          :rules="[{ required: true, message: '请输入用户名' }]"
        />
      </div>
      <div class="one flex-a">
        <div class="user">昵称</div>
        <van-field v-model="userInfo.username" disabled></van-field>
      </div>
      <!-- 性别 -->
      <div class="one flex-a">
        性别
        <van-radio-group
          v-model="userInfo.gender"
          direction="horizontal"
          class="marl25"
        >
          <van-radio name="男">男</van-radio>
          <van-radio name="女">女</van-radio>
        </van-radio-group>
      </div>
      <div class="one flex-a">邮箱</div>
      <!-- 时间选择 -->
      <div class="one flex-a time">
        <div class="user">出生年月</div>
        <div class="eee" @click="years">
          <van-field
            v-model="text"
            placeholder="请选择年月日"
            :rules="[{ required: true, message: '请选择年月日' }]"
          />
        </div>
      </div>
      <div v-if="flag">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="confirm"
          @cancel="cancel"
        />
      </div>
      <div class="preservation flex-ja" @click="Storage">保存</div>
      <div class="cancel flex-ja" @click="back">取消</div>
    </van-form>
  </div>
</template>

<script>
import dayjs from "dayjs";
import Top from "../../components/top/Top.vue";
export default {
  name: "",
  props: {},
  data() {
    return {
      minDate: new Date(1960, 0, 1),
      maxDate: new Date(), //最大直接就是今天的时间
      currentDate: new Date(),
      flag: false, //时间选择器控制器
      text: "", //年月日
      userInfo: "", //储存的用户信息
      birthday: "", //初始的生日
    };
  },
  components: { Top },
  methods: {
    onSubmit(values) {
      // console.log("submit", values);
    },
    years() {
      //选择年月日
      this.flag = true;
    },
    confirm(date) {
      //选择时间确认
      this.flag = false;
      this.text = dayjs(date).format("YYYY年MM月DD日"); //把时间赋给输入框
    },
    cancel() {
      //选择时间的取消按钮
      this.flag = false;
    },
    back() {
      //返回我的
      this.$router.back();
    },
    Storage() {
      if (
        this.userInfo.nickname === "" ||
        this.text === "" ||
        this.userInfo.gender === ""
      ) {
        this.$toast("请填写完整信息");
      } else {
        this.userInfo.time = this.text;
        localStorage.setItem("userInfo", JSON.stringify(this.userInfo));
        this.$router.back("/my");
      }
    },
  },
  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.text = this.userInfo.time; //初始的时间
    // console.log(this.text);
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.one {
  height: 50px;
  border-top: 1px solid #eee;
  padding-left: 15px;
}
.portrait {
  height: 100px;
  border-top: 1px solid #eee;
  padding-left: 15px;
  .arrow {
    margin-left: 10px;
    padding-right: 10px;
    position: relative;
    top: -20px;
    font-size: 24px;
  }
}
.time {
  border-bottom: 1px solid #eee;
}
.user {
  width: 100px;
}
.preservation {
  width: 300px;
  height: 45px;
  background: #07c160;
  margin: 20px auto;
  color: #fff;
}
.cancel {
  width: 300px;
  height: 45px;
  margin: 20px auto;
  border: 1px solid #eee;
}
.van-picker {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 210px;
}
</style>