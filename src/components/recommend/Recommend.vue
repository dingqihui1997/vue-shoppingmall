<template>
  <!-- 商品推荐 -->
  <div class="box">
    <div>商品推荐</div>
    <div class="big" ref="big">
      <div class="flex box1" ref="box1">
        <div
          v-for="(item, index) in recommend"
          :key="index"
          class="flex-d one"
          ref="one"
          @click="click(item, index)"
        >
          <div><img :src="item.image" alt="" /></div>
          <div class="text">{{ item.goodsName }}</div>
          <div class="flex money">
            <div>{{ `￥${item.mallPrice}` }}</div>
            <div class="price">{{ `￥${item.price}` }}</div>
          </div>
          <div class="flex but">
            <div class="gouwuc flex-ja">
              <van-icon name="cart" @click.stop="goto(item)" />
            </div>
            <div class="look flex-ja">查看详情</div>
          </div>
        </div>
      </div>
    </div>
    <van-dialog v-model="show" show-cancel-button @confirm="confirm" allow-html>
      <div class="dialog1">
        <div class="dialog flex-ja font18">登录后才可使用此功能</div>
        <div class="dialog2 flex-ja">是否跳转登录/注册页面</div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "HomeRecommand",
  props: {
    recommend: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      scroll: null,
      show: false,
    };
  },
  components: {},
  methods: {
    verScroll() {
      let width = this.recommend.length * 125; // 动态计算出滚动区域的大小，前面已经说过了，产生滚动的原因是滚动区域宽度大于父盒子宽度
      this.$refs.box1.style.width = width + "px"; // 修改滚动区域的宽度
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.big, {
            startX: 0, // 配置的详细信息请参考better-scroll的官方文档，这里不再赘述
            click: true,
            scrollX: true,
            scrollY: true,
            eventPassthrough: "vertical",
          });
        } else {
          this.scroll.refresh(); //如果dom结构发生改变调用该方法
        }
      });
    },
    click(item, index) {
      //跳转详情
      this.$router.push({
        path: "/details",
        query: { id: item.goodsId },
      });
    },
    confirm() {
      //没登录时弹框点击确定时跳转
      this.$router.push("/register");
    },
    goto(item) {
      //点击购物车判断是否登录
      // console.log(item);
      if (localStorage.getItem("name") === null) {
        //如果没登录就提示用户
        this.show = true;
      } else {
        //如果登录就加入购物车，发请求加购商品
        this.$api
          .addShop(item.goodsId)
          .then((res) => {
            // console.log(res);
            if (res.code === 200) {
              //加入成功
              this.$toast(res.msg);
              this.$api
                .getCard() //加入成功获取购物车里面的数据
                .then((res) => {
                  // console.log(res);
                  localStorage.setItem("num", res.shopList.length);
                  this.$store.commit("setBadge", res.shopList.length); //修改共享数据
                })
                .catch((err) => {
                  console.log("请求失败", err);
                });
            }
          })
          .catch((err) => {
            console.log("请求失败", err);
          });
      }
    },
  },
  mounted() {
    // console.log(this.recommend);
    this.$nextTick(() => {
      let timer = setTimeout(() => {
        // 其实我也不想写这个定时器的，这相当于又嵌套了一层$nextTick，但是不这么写会失败
        if (timer) {
          clearTimeout(timer);
          this.verScroll();
        }
      }, 0);
    });
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  height: 225px;
  background: #fff;
  margin-top: 15px;
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;

  .one {
    width: 125px;
    height: 180px;
    border: 1px solid #f5f5f5;
  }
  img {
    height: 100px;
    width: 115px;
  }
  .text {
    color: #333;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .price {
    margin-left: 10px;
    font-size: 14px;
    position: relative;
    top: 2px;
    color: #c5c5c5;
    text-decoration: line-through;
  }
  .but {
    width: 105px;
    height: 30px;
    border-radius: 5px;
    overflow: hidden;
    margin-top: 5px;
    .gouwuc {
      width: 30px;
      height: 100%;
      background-color: #feca3a;
      font-size: 18px;
      color: #fff;
    }
    .look {
      width: 80px;
      background-color: #ff4c38;
      color: #fff;
    }
  }
}
</style>