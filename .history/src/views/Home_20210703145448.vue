<template>
  <!-- 首页 -->
  <div>
    <top>
      <template #left>
        <div>{{ city }}<van-icon name="arrow-down" /></div>
      </template>
      <template #center
        ><van-search v-model="value" placeholder="请输入搜索关键词"
      /></template>
      <template #right>搜索</template>
    </top>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      newcity: "定位中",
      value: "",
    };
  },
  components: {},
  methods: {
    getLocation() {
      let that = this;
      AMap.plugin("AMap.Geolocation", function () {
        let geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
          // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
          buttonOffset: new AMap.Pixel(10, 20),
          //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          zoomToAccuracy: true,
          //  定位按钮的排放位置,  RB表示右下
          buttonPosition: "RB",
        });
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete);
        AMap.event.addListener(geolocation, "error", onError);
        function onComplete(data) {
          // data是具体的定位信息
          console.log(data);
          that.newcity = data.addressComponent.city;
          console.log(that.newcity);
          that.$store.commit("setCity", that.newcity);
        }

        function onError(data) {
          // 定位出错
          console.log(data);
        }
      });
    },
    // updatestate() {
    //   //调用修改的方法
    //   this.$store.commit("setCity", this.newcity);
    // },
  },
  mounted() {
    this.getLocation();
    // this.updatestate();
  },
  computed: {
    city() {
      return this.$store.state.city; //获取共享数据
    },
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
.van-search {
  width: 230px !important;
  height: 30px;
  margin-top: 5px;
  margin-left: 90px;
  border: none;
}
</style>