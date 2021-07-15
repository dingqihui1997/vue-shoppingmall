<template>
  <!-- 详情页 -->
  <div class="box details-box">
    <div class="top flex-ja"><van-icon name="arrow-left" @click="back" /></div>
    <div class="img">
      <!-- 图片预览 -->
      <van-image-preview v-model="show" :images="images" @change="onChange">
        <template v-slot:index>第{{ index + 1 }}页</template>
      </van-image-preview>
      <!-- 图片轮播图 -->
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#FF8855">
        <van-swipe-item
          ><img :src="goodsOne.image_path" @click="imgs" class="img100"
        /></van-swipe-item>
        <van-swipe-item
          ><img :src="goodsOne.image_path" @click="imgs" class="img100"
        /></van-swipe-item>
      </van-swipe>
    </div>
    <div class="pad10">
      <div class="name">{{ goodsOne.name }}</div>
      <div class="price">{{ "￥" + goodsOne.present_price }}</div>
      <!-- 收藏部分 -->
      <collection
        v-if="Object.keys(goodsOne).length !== 0"
        :goodsOne="goodsOne"
      ></collection>
      <div class="shop flex-sba">
        <div><van-icon name="shop-o" />有赞的店 <span>官方</span></div>
        <div>进入店铺<van-icon name="arrow" /></div>
      </div>
    </div>
    <!-- 商品详情和用户评论 -->
    <reviews
      v-if="Object.keys(goodsOne).length !== 0"
      :goodsOne="goodsOne"
      :comment="comment"
    ></reviews>
    <!-- 详情底部 -->
    <goodsaction
      v-if="Object.keys(goodsOne).length !== 0"
      :goodsOne="goodsOne"
    ></goodsaction>
  </div>
</template>

<script>
import Collection from "../../components/collection/Collection.vue";
import Goodsaction from "../../components/goodsaction/Goodsaction.vue";
import Reviews from "../../components/reviews/Reviews.vue";
export default {
  name: "",
  props: {},
  data() {
    return {
      show: false, //图片预览。最开始隐藏
      id: "", //接收传递过来的id
      goodsOne: {},
      images: [], //预览的图片
      index: 0, //预览显示的页码
      detail: "",
      active: 0,
      comment: [], //评论
    };
  },
  components: { Goodsaction, Reviews, Collection },
  methods: {
    onChange(index) {
      this.index = index;
    },
    imgs() {
      this.show = true; //点击图片然后预览显示
    },
    back() {
      this.$router.back();
    },
    // History() {
    //   //储存历史记录
    //   let arr = [];
    //   if (localStorage.getItem("History")) {
    //     arr = JSON.parse(localStorage.getItem("History"));
    //     let num = null;
    //     num = arr.find((item) => {
    //       return item.id === this.goodsOne.id; //未找到返回undefined
    //     });
    //     if (!num) {
    //       //如果没找到就是false才push
    //       arr.push(this.goodsOne);
    //     }
    //   } else {
    //     arr.push(this.goodsOne);
    //   }
    //   localStorage.setItem("History", JSON.stringify(arr));
    // },
    History() {
      //调用公共方法,储存浏览记录
      if (localStorage.getItem("name")) {
        this.$utils.saveHistory({
          user: localStorage.getItem("name"),
          key: "browse",
          data: this.goodsOne,
          attr: "id",
        });
      }
    },
  },
  mounted() {
    this.id = this.$route.query.id; //接收传递过来的id
    this.$api
      .goodOne(this.id)
      .then((res) => {
        // console.log(res);
        this.goodsOne = res.goods.goodsOne; //商品详情
        this.History();
        this.comment = res.goods.comment; //评价信息
        this.images = [this.goodsOne.image, this.goodsOne.image]; //预览图的路径，两张
        // console.log(this.comment);
      })
      .catch((err) => {
        console.log("请求失败", err);
      });
  },
  computed: {},
  watch: {},
};
</script>
<style lang='scss' scoped>
.top {
  width: 35px;
  height: 35px;
  background: #7f7f7f;
  border-radius: 100%;
  color: #fff;
  margin-left: 5px;
  position: fixed;
  z-index: 3;
}
.box {
  width: 100%;
  height: 100%;
  background: #fff;
  padding-top: 10px;
  .img {
    height: 370px !important;
  }
  .name {
    margin-top: 10px;
    border-top: 1px solid #f8f8f8;
    padding-top: 5px;
  }
  .price {
    margin-top: 5px;
    color: #ff4444;
    border-bottom: 1px solid #f8f8f8;
    padding-bottom: 5px;
  }
  .shop {
    height: 75px;
    font-size: 14px;
    border-bottom: 1px solid #f8f8f8;
    .van-icon-shop-o {
      font-size: 20px;
      position: relative;
      top: 5px;
      margin-right: 5px;
    }
    span {
      padding: 4px;
      background: #ff4444;
      color: #fff;
      border-radius: 5px;
    }
    .van-icon-arrow {
      font-size: 18px;
      position: relative;
      top: 4px;
      color: #666;
    }
  }
}
</style>