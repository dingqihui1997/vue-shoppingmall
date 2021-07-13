<template>
  <!-- 评价 待评价和已评价 -->
  <div class="tabs-line-wrap">
    <van-sticky>
      <top>
        <template #left
          ><van-icon name="arrow-left" class="leftarrow" @click="back"
        /></template>
        <template #center>评价中心</template>
      </top>
    </van-sticky>
    <div class="img">
      <img src="../../assets/evaluate.jpg" class="img100" />
    </div>
    <van-tabs v-model="active" sticky>
      <van-tab title="待评价">
        <van-pull-refresh v-model="refreshing">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div
              v-for="(item, index) in list"
              :key="index"
              class="flex box"
              @click="goto(item)"
            >
              <div class="image_path">
                <img :src="item.image_path" alt="" />
              </div>
              <div class="name">{{ item.name }}</div>
              <div class="order flex-ja"><van-icon name="chat" />评论晒单</div>
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="已评价">
        <van-pull-refresh v-model="refreshing">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad1"
          >
            <div>
              <div
                v-for="(item, index) in goods"
                :key="index"
                class="flex box"
                @click="look(item)"
              >
                <div class="image_path flex-ja">
                  <img :src="item.goods[0].image_path" alt="" />
                </div>
                <div class="name">{{ item.goods[0].name }}</div>
                <div class="order1 flex-ja">查看评价</div>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
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
      loading: false,
      finished: false,
      refreshing: false,
      page: 1,
      goods: [], //已评价商品信息
      count: 0,
      count1: 0,
      page1: 1, //已评价
    };
  },
  components: {},
  methods: {
    tobeEvaluated() {
      this.$api
        .tobeEvaluated(this.page)
        .then((res) => {
          // console.log(res);
          this.count = res.data.count;
          this.list = this.list.concat(res.data.list);
          // console.log(this.list);
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    }, //获取待评价数
    goto(item) {
      this.$router.push({
        path: "/comment",
        query: { goodsone: JSON.stringify(item) },
      });
    }, //去评价
    alreadyEvaluated() {
      this.$api
        .alreadyEvaluated(this.page1)
        .then((res) => {
          this.count1 = res.data.count;
          this.goods = this.goods.concat(res.data.list);
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    }, //已评价信息
    look(item) {
      this.$router.push({
        path: "/commentdetails",
        query: { goods: JSON.stringify(item) },
      });
    }, //查看已评价详情
    back() {
      this.$router.push("/my");
    }, //返回我的
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }
        if (this.list.length >= this.count) {
          this.finished = true;
        }
        this.page++;
        this.tobeEvaluated();
        this.loading = false;
      }, 1000);
    }, //待评价下拉刷新
    onLoad1() {
      setTimeout(() => {
        if (this.refreshing) {
          this.goods = [];
          this.refreshing = false;
        }
        if (this.goods.length >= this.count1) {
          this.finished = true;
        }
        this.page1++;
        this.alreadyEvaluated();
        this.loading = false;
      }, 1000);
    }, //已评价下拉刷新
  },
  mounted() {
    this.tobeEvaluated(); //待评价
    this.alreadyEvaluated(); //已评价
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
.van-tabs {
  overflow: hidden;
  height: 100%;
}
.image_path {
  margin-top: 10px;
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
  height: 100px;
  position: relative;
  border-bottom: 1px #eee solid;
}
.zhanwei {
  width: 100%;
  height: 40px;
}
</style>