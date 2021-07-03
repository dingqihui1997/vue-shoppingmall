<template>
  <!-- 首页分类板块 -->
  <div class="box flex">
    <div v-for="(item, index) in category" :key="index" class="flex1">
      <div><img :src="item.image" alt="" /></div>
      <div></div>
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
  },
  data() {
    return {};
  },
  components: {},
  methods: {},
  mounted() {
    console.log(this.category);
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
}
</style>