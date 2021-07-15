<template>
  <!-- 浏览 -->
  <div>
    <van-sticky>
      <top>
        <template #left
          ><van-icon name="arrow-left" class="leftarrow" @click="back"
        /></template>
        <template #center>最近浏览</template>
      </top>
    </van-sticky>
    <div
      v-for="(item, index) in list"
      :key="index"
      class="flex-a box"
      @click="goto(item)"
    >
      <div class="img"><img :src="item.image_path" class="img100" /></div>
      <div class="name">
        <div class="name1">{{ item.name }}</div>
        <div class="price">{{ "￥" + item.present_price }}</div>
      </div>
      <div class="close"><van-icon name="close" @click.stop="del(item)" /></div>
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
    back() {
      this.$router.push("/my");
    },
    goto(item) {
      this.$router.push({
        path: "/details",
        query: {
          id: item.id,
        },
      });
    }, //跳详情页面
    del(item) {
      this.list.splice(item, 1);
      localStorage.setItem(
        `${localStorage.getItem("name")}browseHistory`,
        JSON.stringify(this.list)
      );
    }, //删除
  },
  mounted() {
    let a = this.$utils.getHistory({
      user: `${localStorage.getItem("name")}`,
      key: "browse",
    });
    if (a) {
      this.list = a;
      this.list.reverse();
    }
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  width: 100%;
  height: 100px;
  padding-left: 10px;
  border-top: 1px solid #eee;
  position: relative;
  .img {
    width: 80px;
    height: 80px;
    border: 1px solid #eee;
  }
  .name {
    margin-left: 10px;
    padding-bottom: 25px;
    font-size: 14px;
  }
  .price {
    margin-top: 10px;
    color: #ff0000;
    font-weight: 700;
  }
  .close {
    position: absolute;
    right: 15px;
    bottom: 10px;
  }
}
</style>