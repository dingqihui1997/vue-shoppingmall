<template>
  <!-- 评价 待评价和已评价 -->
  <div class="tabs-line-wrap">
    <top>
      <template #left
        ><van-icon name="arrow-left" class="leftarrow" @click="back"
      /></template>
      <template #center>评价中心</template>
    </top>
    <div class="img">
      <img src="../../assets/evaluate.jpg" class="img100" />
    </div>
    <van-tabs v-model="active">
      <van-tab title="待评价">
        <div
          v-for="(item, index) in list"
          :key="index"
          class="flex box"
          @click="goto(item)"
        >
          <div class="image_path"><img :src="item.image_path" alt="" /></div>
          <div class="name">{{ item.name }}</div>
          <div class="order flex-ja"><van-icon name="chat" />评论晒单</div>
        </div>
        <div class="zhanwei"></div>
      </van-tab>
      <van-tab title="已评价">
        <div>
          <div
            v-for="(item, index) in goods"
            :key="index"
            class="flex box"
            @click="look(item)"
          >
            <div class="image_path">
              <img :src="item.goods[0].image_path" alt="" />
            </div>
            <div class="name">{{ item.goods[0].name }}</div>
            <div class="order1 flex-ja">查看评价</div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <van-pagination
      v-model="currentPage"
      :page-count="5"
      :items-per-page="10"
      mode="simple"
      @change="change"
    />
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      active: 0,
      list: [], //待评价
      currentPage: 1,
      goods: [], //已评价商品信息
    };
  },
  components: {},
  methods: {
    tobeEvaluated() {
      //获取待评价数
      this.$api
        .tobeEvaluated(this.currentPage)
        .then((res) => {
          this.list = res.data.list;
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
    change(Page) {
      //点击页数时触发
      this.currentPage = Page;
      this.tobeEvaluated();
    },
    goto(item) {
      //去评价
      this.$router.push({
        path: "/comment",
        query: { goodsone: JSON.stringify(item) },
      });
    },
    alreadyEvaluated() {
      //已评价信息
      this.$api
        .alreadyEvaluated()
        .then((res) => {
          this.goods = res.data.list;
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
    look(item) {
      //查看已评价详情
      this.$router.push({
        path: "/commentdetails",
        query: { goods: JSON.stringify(item) },
      });
    },
    back() {
      this.$router.push("/my");
    },
  },
  mounted() {
    this.tobeEvaluated(this.currentPage); //待评价
    this.alreadyEvaluated();
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.img {
  height: 160px;
  width: 100%;
}
.van-tabs--line .van-tabs__wrap {
  height: 11.733vw;
  border-radius: 10px;
  position: relative;
  top: -22px;
  left: 20px;
  width: 90%;
  box-shadow: 0 0 2px 1px #eee;
}
.image_path {
  img {
    width: 80px;
    height: 80px;
  }
}
.order {
  width: 90px;
  height: 25px;
  border-radius: 10px;
  border: 1px solid #ff0000;
  font-size: 12px;
  color: #ff0000;
  position: absolute;
  right: 5px;
  bottom: 10px;
}
.order1 {
  border: 1px solid #666;
  width: 80px;
  height: 25px;
  border-radius: 10px;
  font-size: 12px;
  position: absolute;
  right: 5px;
  bottom: 10px;
}
.name {
  font-size: 14px;
  margin-left: 10px;
  margin-top: 10px;
}
.box {
  position: relative;
  border-bottom: 1px #eee solid;
}
.zhanwei {
  width: 100%;
  height: 40px;
}
</style>