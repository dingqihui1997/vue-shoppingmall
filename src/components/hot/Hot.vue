<template>
  <div class="box">
    <div class="flex-ja top">热销商品</div>
    <div class="flex-w box1">
      <div
        v-for="(item, index) in hotGoods"
        :key="index"
        class="single flex-dji"
        @click="click(item)"
      >
        <div class="img"><img :src="item.image" class="img100" /></div>
        <div class="name">{{ item.name }}</div>
        <div class="flex">
          <div>{{ "￥" + item.mallPrice }}</div>
          <div class="price">{{ "￥" + item.price }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    hotGoods: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  components: {},
  methods: {
    click(item, index) {
      //跳转详情
      this.$router.push({
        path: "/details",
        query: { id: item.goodsId },
      });
    },
  },
  mounted() {
    // console.log(this.hotGoods);
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  width: 100%;
  .box1 {
    background-color: #fff;
  }
}
.top {
  height: 40px;
  color: #e0322b;
}
.single {
  width: 50%;
  height: 230px;
  border: 1px solid #eee;
  .img {
    width: 100%;
    height: 150px;
  }
  .name {
    width: 90%;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .price {
    font-size: 12px;
    color: #e0322b;
    position: relative;
    top: 5px;
    margin-left: 5px;
    text-decoration: line-through;
  }
}
</style>