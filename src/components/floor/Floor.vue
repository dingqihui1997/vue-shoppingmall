<template>
  <!-- 首页1f -->
  <div class="box">
    <div class="Exhibition flex-sb">
      <div class="left flex1 flex-d">
        <div class="flex2">
          <img :src="floor1[0].image" @click="click(floor1[0])" />
        </div>
        <div class="flex1">
          <img :src="floor1[3].image" @click="click(floor1[3])" />
        </div>
      </div>
      <div class="right flex1 flex-d">
        <div class="flex1">
          <img :src="floor1[1].image" @click="click(floor1[1])" />
        </div>
        <div class="flex1">
          <img :src="floor1[2].image" @click="click(floor1[2])" />
        </div>
        <div class="flex1 last">
          <img :src="floor1[4].image" @click="click(floor1[4])" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    floor1: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  components: {},
  methods: {
    click(item) {
      this.$router.push({
        path: "/details",
        query: { id: item.goodsId },
      });
    },
  },
  mounted() {
    // console.log(this.floor1);
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  height: 290px;
  width: 100%;
  background: #fff;
  margin-bottom: 10px;
}
.Exhibition {
  height: 290px;
  width: 100%;

  img {
    width: 100%;
    height: 100%;
    border: #f5f5f5 1px solid;
  }
  .last {
    position: relative;
    top: -6px;
  }
}
</style>