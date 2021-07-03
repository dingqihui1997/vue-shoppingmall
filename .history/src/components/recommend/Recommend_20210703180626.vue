<template>
  <!-- 商品推荐 -->
  <div class="box">
    <div>商品推荐</div>
    <div class="flex box1" ref="box1">
      <div
        v-for="(item, index) in recommend"
        :key="index"
        class="flex-d one"
        ref="one"
      >
        <div><img :src="item.image" alt="" /></div>
        <div class="text">{{ item.goodsName }}</div>
        <div class="flex money">
          <div>{{ `￥${item.mallPrice}` }}</div>
          <div class="price">{{ `￥${item.price}` }}</div>
        </div>
        <div class="flex but">
          <div class="gouwuc flex-ja"><van-icon name="cart" /></div>
          <div class="look flex-ja">查看详情</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "",
  props: {
    recommend: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  components: {},
  methods: {},
  mounted() {
    this.$nextTick(() => {
      // 使用 this.$nextTick 为了确保组件已经渲染完毕
      this.scroll = new Bscroll(this.$refs.box1, {}); // 实例化BScroll接受两个参数，第一个为父盒子的dom节点
    });

    console.log(this.recommend);
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  height: 225px;
  background: #fff;
  margin-top: 15px;
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
  .one {
    width: 125px;
    height: 180px;
    border: 1px solid #f5f5f5;
  }
  // .box1 {
  //   // overflow: hidden;
  // }
  img {
    height: 100px;
    width: 115px;
  }
  .text {
    color: #333;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .price {
    margin-left: 10px;
    font-size: 14px;
    position: relative;
    top: 2px;
    color: #c5c5c5;
    text-decoration: line-through;
  }
  .but {
    width: 105px;
    height: 30px;
    border-radius: 5px;
    overflow: hidden;
    margin-top: 5px;
    .gouwuc {
      width: 30px;
      height: 100%;
      background-color: #feca3a;
      font-size: 18px;
      color: #fff;
    }
    .look {
      width: 80px;
      background-color: #ff4c38;
      color: #fff;
    }
  }
}
</style>