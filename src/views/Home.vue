<template>
  <!-- 首页 -->
  <div class="home">
    <!-- 顶部 -->
    <top>
      <template #left>
        <div @click="location" v-if="flag === true">
          {{ city ? city : "定位中" }}<van-icon name="arrow-down" />
        </div>
        <div v-if="flag === false" style="font-size: 12px" @click="location">
          定位失败
        </div>
      </template>
      <template #center
        ><van-search
          v-model="value"
          placeholder="请输入搜索关键词"
          @focus="focus"
      /></template>

      <template #right>
        <div v-if="show === false" @click="cancel">取消</div>
        <!-- <div v-else>搜索</div> -->
      </template>
    </top>
    <!-- 首页数据 -->
    <div v-if="show === true">
      <!-- 轮播图 -->
      <carousel v-if="slides.length !== 0" :slides="slides"></carousel>
      <!-- 分类 -->
      <homepage
        v-if="category.length !== 0"
        :category="category"
        :imgs="imgs"
      ></homepage>
      <!-- 商品推荐 -->
      <recommend
        v-if="recommend.length !== 0"
        :recommend="recommend"
      ></recommend>
      <!-- 楼层1楼 -->
      <floornum>
        <template #num>1F</template>
        <template #numname>{{ floorName[0] }}</template>
      </floornum>
      <floor v-if="floor1.length !== 0" :floor1="floor1"></floor>
      <!-- 楼层2楼 -->
      <floornum>
        <template #num>2F</template>
        <template #numname>{{ floorName[1] }}</template>
      </floornum>
      <floor v-if="floor2.length !== 0" :floor1="floor2"></floor>
      <!-- 楼层3 -->
      <floornum>
        <template #num>3F</template>
        <template #numname>{{ floorName[2] }}</template>
      </floornum>
      <floor v-if="floor3.length !== 0" :floor1="floor3"></floor>
      <!-- 热销商品 -->
      <hot v-if="hotGoods.length !== 0" :hotGoods="hotGoods"></hot>
    </div>
    <!-- 搜索时的页面 -->
    <div v-if="show === false">
      <search :list="list" :value="value" @modify="modify"></search>
    </div>
  </div>
</template>

<script>
import Carousel from "../components/carousel/Carousel .vue";
import Floor from "../components/floor/Floor.vue";
import Homepage from "../components/homepage/Homepage.vue";
import Hot from "../components/hot/Hot.vue";
import Recommend from "../components/recommend/Recommend.vue";
import Search from "../components/search/Search.vue";
export default {
  name: "",
  props: {},
  data() {
    return {
      show: true,
      newcity: "定位中",
      value: "",
      slides: [], //轮播图
      category: [], //分类图数据
      imgs: "",
      recommend: [], //商品推荐
      floor1: [], //楼层1
      floorName: [], //楼层名称标题
      floor2: [], //2lou
      floor3: [], //三楼
      hotGoods: [], //热销商品
      list: [], //搜索的数据
      flag: true,
    };
  },
  components: { Carousel, Homepage, Recommend, Floor, Hot, Search },
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
          localStorage.setItem("position1", that.newcity); //将修改后的数据储存到本地
          // console.log(that.newcity);
        }
        function onError(data) {
          // 定位出错
          console.log(data);
          that.flag = false;
        }
      });
    },
    location() {
      //选择城市
      this.$router.push("/city");
    },
    search(value) {
      this.$api
        .search({ value: this.value })
        .then((res) => {
          // console.log(res);
          this.list = res.data.list; //搜索获得的数据
          // console.log(this.list);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    focus() {
      //控制搜索框
      this.show = false;
    },
    cancel() {
      this.show = true;
      this.value = "";
    },
    modify(item) {
      //点击搜索
      this.value = item;
    },
  },
  mounted() {
    if (!this.city) {
      //如果储存的数据没有值，就调用方法
      this.getLocation();
    }
    this.$api //主页所有数据请求
      .recommend()
      .then((res) => {
        // console.log(res);
        this.slides = res.data.slides; //轮播图数据
        this.category = res.data.category; // 分类数据
        this.imgs = res.data.advertesPicture.PICTURE_ADDRESS;
        this.recommend = res.data.recommend; //商品推荐
        this.floor1 = res.data.floor1; //楼层一
        this.floor2 = res.data.floor2; //楼层2
        this.floor3 = res.data.floor3; //楼层3
        this.floorName = Object.values(res.data.floorName); //楼层名称
        this.hotGoods = res.data.hotGoods; //热销
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
  watch: {
    value(val) {
      // console.log(val);
      if (val !== "") {
        this.search(val);
        // console.log(this.arr);
      } else {
        this.list = [];
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.van-search {
  width: 280px !important;
  height: 25px;
  margin-left: 20px;
  border: none;
  // background-color: #f2f2f2;
  display: flex;
  align-content: center;
}
.home {
  width: 100%;
  overflow: hidden;
  background: #eee;
}
</style>