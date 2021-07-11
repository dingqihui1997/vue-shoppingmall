<template>
  <!-- 首页分类板块 -->
  <div>
    <div class="box flex">
      <div
        v-for="(item, index) in category"
        :key="index"
        class="flex1"
        @click="goto(item, index)"
      >
        <div><img :src="item.image" /></div>
        <div>{{ item.mallCategoryName }}</div>
      </div>
    </div>
    <div class="img">
      <img :src="imgs" class="img100" />
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    category: {
      type: Array,
      required: true,
    },
    imgs: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  components: {},
  methods: {
    goto(item, index) {
      localStorage.setItem("category", JSON.stringify(this.category));
      this.$router.push({
        path: "/classification",
        query: {
          key: index, //传递下标
        },
      });
    },
  },
  mounted() {
    // console.log(this.category);
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  width: 95%;
  height: 100px;
  margin: 10px;
  background: #fff;
  border-radius: 10px;
  padding-left: 15px;
  padding-top: 15px;
  font-size: 14px;
  img {
    width: 50px;
    height: 50px;
    margin-bottom: 10px;
  }
}
.img {
  width: 100%;
  height: 40px;
}
</style>