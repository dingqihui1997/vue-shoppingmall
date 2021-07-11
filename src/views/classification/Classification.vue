<template>
  <!-- 分类 -->
  <div class="home sticky-fixed">
    <van-sticky>
      <top><template #center>商品分类</template></top>
    </van-sticky>
    <div class="sidebar">
      <van-sidebar v-model="activeKey">
        <van-sidebar-item
          :title="item.mallCategoryName"
          v-for="(item, index) in category"
          :key="index"
          @click="goto(item, index)"
        />
      </van-sidebar>
    </div>
    <div class="box">
      <!-- 二级标题 -->
      <van-tabs v-model="active" @click="choice" :ellipsis="false">
        <van-tab
          :title="item1.mallSubName"
          v-for="(item1, index1) in bxMall"
          :key="index1"
        >
          <!-- 二级标题的内容 -->
          <div
            v-for="(item, index) in dataList"
            :key="index"
            class="flex-a one"
            @click="details(item)"
          >
            <img :src="item.image_path" alt="" />
            <div class="flex-d">
              <div class="name">{{ item.name }}</div>
              <div class="flex">
                <div class="price font14">
                  {{ "￥" + item.present_price }}
                </div>
                <div class="orl font14">{{ "￥" + item.orl_price }}</div>
              </div>
            </div>
          </div>
          <div class="zhanw"></div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      category: [], //分类数据
      activeKey: 0, // 一级竖向标签
      active: 0, //二级横向标签
      bxMall: [], //二级标题
      dataList: "", //商品信息
    };
  },
  components: {},
  methods: {
    getdata() {
      this.$api
        .category(
          this.category[this.activeKey].bxMallSubDto[this.active].mallSubId
        )
        .then((res) => {
          this.dataList = res.dataList;
          // console.log(this.dataList);
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
    goto(item, index) {
      this.activeKey = index;
      this.bxMall = this.category[index].bxMallSubDto; //点击一级标题就切换二级标题
      this.getdata();
    },
    choice(index) {
      //点击二级标题
      this.active = index;
      this.getdata();
    },
    details(item) {
      //点击商品进入详情页面
      console.log(item);
      this.$router.push({
        path: "/details",
        query: { id: item.id },
      });
    },
  },
  mounted() {
    this.category = JSON.parse(localStorage.getItem("category")); //全部数据
    if (this.$route.query.key) {
      //如果是从首页的分类点进来的就把下标赋给 一级标题的下标
      this.activeKey = this.$route.query.key;
    }
    this.bxMall = this.category[this.activeKey].bxMallSubDto; //一进页面就默认二级标题是第一项
    let list = this.category[0].bxMallSubDto; //二级标题里面的商品详情信息
    list.id = list[0].mallSubId; //进页面默认的第一项的详情
    this.getdata(list.id);
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
.home {
  position: relative;
  height: 100%;
  .box {
    position: absolute;
    right: 0;
    top: 45px;
    width: 295px;
    border-top: 1px #eee solid;
  }
  .van-sidebar {
    border-top: 1px #eee solid;
    position: fixed;
    left: 0;
    top: 45;
    height: 100%;
    background: #f7f8fa;
  }
  .one {
    width: 100%;
    height: 100px;
    img {
      width: 80px;
      height: 80px;
      border: 1px #eee solid;
      margin-left: 10px;
    }
  }
  .name {
    color: #f00000;
    font-size: 14px;
    margin-bottom: 15px;
    margin-left: 10px;
  }
  .orl {
    text-decoration: line-through;
    margin-left: 5px;
  }
  .price {
    color: #f00000;
    margin-left: 10px;
  }
  .zhanw {
    width: 100%;
    height: 35px;
  }
}
</style>