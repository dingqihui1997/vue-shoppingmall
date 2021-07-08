<template>
  <!-- 全部订单 和已完成 -->
  <div class="home">
    <van-sticky>
      <top class="topflexd">
        <template #left
          ><van-icon name="arrow-left" class="leftarrow" @click="back"
        /></template>
        <template #center>我的订单</template>
      </top>
    </van-sticky>
    <div>
      <div class="box" v-for="(item, index) in list" :key="index">
        <div class="flex-sb number">
          <div>订单号：{{ item.order_id }}</div>
          <div class="order">交易完成</div>
        </div>
        <div
          v-for="(item1, index1) in item.order_list"
          :key="index1"
          class="flex one"
        >
          <div><img :src="item1.image_path" /></div>
          <div class="name">{{ item1.name }}</div>
          <div class="Price">
            <div>{{ "￥" + item1.mallPrice }}</div>
            <div class="count">{{ "x" + item1.count }}</div>
          </div>
        </div>
        <div class="address">
          <div>创建时间：{{ item.add_time }}</div>
          <div>收货地址：{{ item.address }}</div>
          <div>
            共计{{ item.order_list.length }}商品 合计：{{ item.mallPrice }}
          </div>
        </div>
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
      list: [],
    };
  },
  components: {},
  methods: {
    getdata() {
      //获取用户订单数量
      this.$api
        .getMyOrder()
        .then((res) => {
          this.list = res.list;
          console.log(this.list);
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
    back() {
      this.$router.push("/my");
    },
  },
  mounted() {
    this.getdata();
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.home {
  height: 100%;
  background: #eee;
  .box {
    width: 95%;
    margin: 10px;
    background: #fff;
    padding: 5px 10px;
  }
  .order {
    color: #d2591b;
  }
  .number {
    height: 25px;
    border-bottom: 1px solid #eee;
  }
  .one {
    img {
      width: 80px;
      height: 80px;
      border: 1px solid #eee;
      margin-top: 10px;
      border-radius: 10px;
    }
  }
  .name {
    padding-top: 20px;
    width: 185px;
    margin-left: 5px;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .Price {
    padding-top: 20px;
    width: 65px;
    text-align: right;
  }
  .count {
    font-size: 14px;
    color: #666;
  }
  .address {
    height: 80px;
    border-top: 1px solid #eee;
    text-align: right;
    font-size: 14px;
    color: #333333;
    div {
      padding-top: 5px;
    }
  }
}
</style>