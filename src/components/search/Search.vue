<template>
  <div class="box">
    <!-- 输入框没有值时，就显示历史记录-->
    <div v-if="value === ''">
      <div class="flex-sb">
        <div>搜索历史</div>
        <div><van-icon name="delete-o" /></div>
      </div>
      <div v-for="(item, index) in arr" :key="index">{{ item.name }}</div>
    </div>
    <div v-else>
      <div
        v-for="(item, index) in list"
        :key="index"
        class="one"
        v-html="
          item.name.replace(
            value,
            `<span style='color:#FF0000'>${value}</span>`
          )
        "
        @click="details(item)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    list: {
      type: Array,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      flag: false,
      arr: [],
    };
  },
  components: {},
  methods: {
    details(item) {
      //先获取储存的值，如果有值，就给arr，然后往arr里面push进去，
      let commodity = JSON.parse(localStorage.getItem("commodity"));
      if (commodity !== null) {
        this.arr = commodity;
      }
      this.arr.push(item);
      console.log(this.arr);
      localStorage.setItem("commodity", JSON.stringify(this.arr));
      this.$api //点击商品跳转到详情
        .goodOne(item)
        .then((res) => {
          this.$router.push({
            path: "/details",
            query: { id: item.id },
          });
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
.box {
  background: #fff;
}
.one {
  background: #fff;
  padding-left: 10px;
  padding-top: 15px;
  font-size: 14px;
}
</style>