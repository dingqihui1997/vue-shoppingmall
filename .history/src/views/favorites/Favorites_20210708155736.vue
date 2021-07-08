<template>
  <!-- 收藏商品 -->
  <div>
    <top>
      <template #left
        ><van-icon name="arrow-left" class="leftarrow" @click="back"
      /></template>
      <template #center>
        <div>我的收藏</div>
      </template>
    </top>
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
    del(item) {
      // 删除收藏;
      this.$api
        .cancelCollection(item.cid)
        .then((res) => {
          //   console.log(res);
          if (res.code === 200) {
            // this.list.splice(item, 1); //后端删除成功，页面上删除
            this.$toast(res.msg);
          }
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
    goto(item) {
      //点击查看详情
      console.log(item);
      this.$router.push({
        path: "/details",
        query: { id: item.cid },
      });
    },
    back() {
      console.log(111);
      this.$router.back();
    },
  },
  mounted() {
    this.$api
      .getCollection()
      .then((res) => {
        console.log(res);
        this.list = res.data.list;
      })
      .catch((err) => {
        console.log("请求失败", err);
      });
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