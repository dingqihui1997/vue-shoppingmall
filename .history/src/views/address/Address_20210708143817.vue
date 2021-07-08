<template>
  <!-- 地址l列表 -->
  <div class="box">
    <top>
      <template #left
        ><van-icon name="arrow-left" class="leftarrow" @click="back"
      /></template>
      <template #center>地址列表</template>
    </top>
    <div v-if="address.length === 0" class="blank flex-ja">暂无收货地址~~</div>
    <van-address-list
      v-model="chosenAddressId"
      :list="address"
      default-tag-text="默认"
      @edit="onEdit"
      @add="onAdd"
      @select="select"
    />
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      address: [],
      chosenAddressId: "1",
    };
  },
  components: {},
  methods: {
    onEdit(item, index) {
      //点击修改
      console.log(item);
      this.$router.push({
        path: "./newaddress",
        query: { obj: JSON.stringify(item) },
      });
    },
    onAdd() {
      //新增地址
      this.$router.push("/newaddress");
    },
    back() {
      //返回我的
      this.$router.back();
    },
    getAddress() {
      //获取用户的地址
      this.$api
        .getAddress()
        .then((res) => {
          this.address = res.address;
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
    select(2){
      console.log(item);
    }
  },
  mounted() {
    this.getAddress();
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.new {
  position: absolute;
  bottom: 0;
  height: 50px;
  background: #ff4444;
  color: #fff;
}
.blank {
  border-top: 1px solid #eee;
  padding-top: 20px;
  color: #bcc1d1;
}
</style>