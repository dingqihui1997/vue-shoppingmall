<template>
  <!-- 发表评论 -->
  <div>
    <top>
      <template #left
        ><van-icon name="arrow-left" class="leftarrow" @click="back"
      /></template>
      <template #center>评价中心</template>
    </top>
    <div class="box flex-a">
      <div class="img"><img :src="list.image_path" class="img100" /></div>
      <div class="score">
        <div>商品评分</div>
        <div class="rate"><van-rate v-model="value" /></div>
      </div>
    </div>
    <div class="text">
      <textarea placeholder="说说您的购买感受吧" v-model="content"></textarea>
      <van-uploader v-model="fileList" multiple />
    </div>
    <div class="radio">
      <van-checkbox v-model="anonymous">匿名评价</van-checkbox>
    </div>
    <div class="butt flex-ja" @click="goto">提交</div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      list: {},
      value: 0, //评分
      fileList: [], //上传图片
      anonymous: false, //单选框,是否匿名
      content: "", //内容
    };
  },
  components: {},
  methods: {
    goto() {
      //提交评价
      if (this.value === 0) {
        this.$toast("请对商品进行评分");
      } else {
        this.$api
          .comment(
            this.list.cid,
            this.value,
            this.content,
            this.anonymous,
            this.list._id,
            this.list.order_id,
            this.fileList
          )
          .then((res) => {
            console.log(res);
            if (res.code === 200) {
              this.$toast(res.msg);
              this.$router.push("/evaluate");
            }
          })
          .catch((err) => {
            console.log("请求失败", err);
          });
      }
    },
    back() {
      this.$router.push("/evaluate");
    },
  },
  mounted() {
    this.list = JSON.parse(this.$route.query.goodsone);
    console.log(this.list);
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
  padding-left: 20px;
  .img {
    width: 90px;
    height: 90px;
  }
  .score {
    margin-left: 20px;
  }
  .rate {
    margin-top: 10px;
  }
}
.text {
  height: 260px;
  width: 100%;
  textarea {
    width: 100%;
    height: 100%;
    border: none;
    background: #f7f7f7;
  }
  .van-uploader {
    position: relative;
    top: -90px;
  }
}
.radio {
  margin-left: 10px;
  margin-top: 10px;
  input {
    height: 15px;
    width: 15px;
  }
}
.butt {
  width: 80%;
  height: 40px;
  background: #07c160;
  color: #fff;
  margin: 15px auto;
}
</style>