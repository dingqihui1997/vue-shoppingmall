<template>
  <!-- 详情页的评论 -->
  <div>
    <van-tabs v-model="active">
      <van-tab title="商品详情"
        ><div v-html="goodsOne.detail" class="font"></div
      ></van-tab>
      <van-tab title="用户评论"
        ><div v-html="goodsOne.detail" class="font"></div
      ></van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    goodsOne: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      active: 0,
    };
  },
  components: {},
  methods: {},
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.font {
  font-size: 0;
}
</style>