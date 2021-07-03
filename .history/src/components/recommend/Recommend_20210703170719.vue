<template>
  <!-- 商品推荐 -->
  <div class="box">
    <div class="flex">
      <div v-for="(item, index) in recommend" :key="index"></div>
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
}
</style>