<template>
  <!-- 订单结算 -->
  <div>
    <top>
      <template #left
        ><van-icon name="arrow-left" class="leftarrow"
      /></template>
      <template #center>订单结算</template>
    </top>
    <van-contact-card
      type="edit"
      :name="currentContact.name"
      :tel="currentContact.tel"
      >sdf
    </van-contact-card>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      currentContact: {
        name: "张三",
        tel: "13000000000",
      },
    };
  },
  components: {},
  methods: {
    obtain() {
      this.$api
        .getDefaultAddress()
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
  },
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
</style>