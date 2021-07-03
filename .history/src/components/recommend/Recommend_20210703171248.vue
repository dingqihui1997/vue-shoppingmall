<template>
  <!-- 商品推荐 -->
  <div class="box">
    <div>商品推荐</div>
    <div class="flex">
      <div v-for="(item, index) in recommend" :key="index" class="flex-d">
        <div><img :src="item.image" alt="" /></div>
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
  padding: 10px;
  img {
    height: 100px;
    width: 120px;
  }
}
</style>