<template>
  <!-- 首页轮播图 -->
  <div>
    <div class="box">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(item, index) in slides" :key="index">
          <img :src="item.image" class="img100" />
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    slides: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      images: [],
    };
  },
  components: {},
  methods: {},
  mounted() {
    console.log(this.slides);
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  width: 100%;
  height: 200px;
  background: greenyellow;
  margin-top: 5px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>