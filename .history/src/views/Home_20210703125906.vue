<template>
  <!-- 首页 -->
  <div>
    <top>
      <template #left> <van-icon name="arrow-down" /></template>
      <template #center></template>
      <template #right>搜索</template>
    </top>
  </div>
</template>

<script>
import Top from "../components/top/Top.vue";
export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  components: { Top },
  methods: {},
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
</style>