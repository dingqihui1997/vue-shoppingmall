<template>
  <!-- 首页 -->
  <div>
    <!-- 顶部 -->
    <top>
      <template #left>
        <div>{{ city }}<van-icon name="arrow-down" /></div>
      </template>
      <template #center
        ><van-search v-model="value" placeholder="请输入搜索关键词"
      /></template>
      <template #right>搜索</template>
    </top>
    <!-- 轮播图 -->
    <carousel v-if="slides.length !== 0" :slides="slides"></carousel>
    <!-- 分类 -->
    <homepage
      v-if="category.length !== 0"
      :category="category"
      :imgs="imgs"
    ></homepage>
    <!-- 商品推荐 -->
    <recommend v-if="recommend.length !== 0" :recommend="recommend"></recommend>
    <foot></foot>
  </div>
</template>

<script>
import Carousel from "../components/carousel/Carousel .vue";
import Foot from "../components/foot/Foot.vue";
import Homepage from "../components/homepage/Homepage.vue";
import Recommend from "../components/recommend/Recommend.vue";
export default {
  name: "",
  props: {},
  data() {
    return {
      newcity: "定位中",
      value: "",
      slides: [], //轮播图
      category: [], //分类图数据
      imgs: "",
      recommend: [], //商品推荐
    };
  },
  components: { Carousel, Homepage, Foot, Recommend },
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
          // console.log(data);
          that.newcity = data.addressComponent.city;
          // console.log(that.newcity);
          that.$store.commit("setCity", that.newcity); //修改共享数据
        }
        function onError(data) {
          // 定位出错
          console.log(data);
        }
      });
    },
  },
  mounted() {
    this.getLocation();
    this.$api
      .recommend()
      .then((res) => {
        // console.log(res);
        this.slides = res.data.slides; //轮播图数据
        this.category = res.data.category; // 分类数据
        this.imgs = res.data.advertesPicture.PICTURE_ADDRESS;
        this.recommend = res.data.recommend; //商品推荐
        // console.log(this.recommend);
      })
      .catch((err) => {
        console.log("请求失败", err);
      });
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
  width: 250px !important;
  height: 25px;
  margin-top: 12px;
  margin-left: 90px;
  border: none;
  background-color: #f2f2f2;
}
</style>