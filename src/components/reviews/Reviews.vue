<template>
  <!-- 详情页的评论 -->
  <div>
    <van-tabs v-model="active">
      <van-tab title="商品详情"
        ><div v-html="goodsOne.detail" class="font"></div>
        <div class="zhanw"></div>
      </van-tab>
      <van-tab title="用户评论">
        <div class="blank flex-ja" v-if="comment.length === 0">
          该商品暂无评论哦~~
        </div>
        <div class="box" v-for="(item, index) in comment" :key="index" v-else>
          <div class="flex-a rate">
            <div class="img">
              <img src="../../assets/icon.svg" class="img100" />
            </div>
            <div>
              <div class="anonymous">
                {{
                  item.anonymous ? item.comment_nickname : item.user[0].nickname
                }}
              </div>
              <div class="ratea"><van-rate v-model="item.rate" /></div>
            </div>
            <div class="time">{{ item.comment_time }}</div>
          </div>
          <div class="content">评价内容：{{ item.content }}</div>
        </div>
        <div class="zhanw"></div>
      </van-tab>
    </van-tabs>
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
    comment: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      active: 0,
    };
  },
  components: {},
  methods: {},
  mounted() {
    this.anonymous = this.comment.anonymous;
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.font {
  font-size: 0;
}
.zhanw {
  width: 100%;
  height: 55px;
}
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
  margin-left: 10px;
}
.blank {
  width: 100%;
  height: 50px;
}
</style>