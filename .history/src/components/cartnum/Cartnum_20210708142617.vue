<template>
  <!-- 购物车有数据时显示的板块 -->
  <div class="cartnum">
    <div class="box">
      <!-- 循环商品页面 -->
      <div v-for="(item, index) in shopList" :key="index" class="flex-a one">
        <div>
          <input type="checkbox" v-model="item.check" @change="one(item)" />
        </div>
        <div class="img" @click="see(item)">
          <img :src="item.image_path" class="img100" />
        </div>
        <div class="flex-da right">
          <div class="name" @click="see(item)">{{ item.name }}</div>
          <div class="flex-sb round">
            <div @click="see(item)">{{ "￥" + item.mallPrice }}</div>
            <div>
              <van-stepper
                v-model="item.count"
                theme="round"
                button-size="22"
                disable-input
                @plus="plus(item)"
                @minus="minus(item)"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- 结算板块 -->
      <div class="bottom flex-d">
        <div class="all flex-sba">
          <div>
            <input type="checkbox" v-model="checked" @change="all" />
            <span v-html="checked ? '取消全选' : '全选'"></span>
          </div>
          <div>
            <div>合计：{{ Price }}</div>
            <div>请确认订单</div>
          </div>
        </div>
        <div class="but flex-e">
          <div class="del" @click="del">删除</div>
          <div class="del" @click="gotobuy">去结算</div>
        </div>
      </div>
    </div>
    <div class="zhanw"></div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    shopList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      checked: false, //多选框
      cid: [], //删除传的数据
    };
  },
  components: {},
  methods: {
    plus(item) {
      this.$api
        .editCart(item.count + 1, item.cid, item.mallPrice)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    }, //点击加按钮
    minus(item) {
      this.$api
        .editCart(item.count - 1, item.cid, item.mallPrice)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    }, //点击减少
    all() {
      this.shopList.map((item) => {
        item.check = this.checked;
      });
    }, //全选
    one(item) {
      this.checked = this.shopList.every((item) => {
        return item.check === true;
      });
    }, //单选
    del() {
      let arr1 = this.shopList.filter((item) => {
        //过滤选中的
        return item.check === true;
      });
      if (arr1.length === 0) {
        this.$toast("请选择商品");
      } else {
        arr1.map((item) => {
          this.cid.push(item.cid);
        });
        console.log(this.cid);
        this.$api
          .deleteShop(this.cid)
          .then((res) => {
            console.log(res);
            if (res.code === 200) {
              this.$toast("删除成功");
              this.$emit("shop", ""); //分发事件让父组件删除
            }
          })
          .catch((err) => {
            console.log("请求失败", err);
          });
      }
      //点击删除
      //点击删除
    }, //点击删除
    see(item) {
      //点击查看详情
      console.log(item);
      this.$router.push({
        path: "/details",
        query: { id: item.cid },
      });
    },
    gotobuy() {
      let arr1 = this.shopList.filter((item) => {
        //过滤选中的
        return item.check === true;
      });

      if (arr1.length === 0) {
        this.$toast("请选择商品");
      } else {
        localStorage.setItem("commodity", JSON.stringify(arr1));
        this.$router.push("/settlement");
      }
    },
  },
  mounted() {},
  computed: {
    Price() {
      let sum = 0; //过滤选中的，然后计算价格
      let arr = this.shopList.filter((item) => {
        return item.check === true;
      });
      arr.map((item) => {
        sum += item.count * item.mallPrice;
      });
      return sum.toFixed(2);
    },
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  width: 100%;
  border-top: 1px solid #eee;
  //   padding-left: 10px;
}
.one {
  width: 100%;
  height: 100px;
  border-bottom: 1px solid #eee;
  .img {
    border: 1px solid #eee;
    margin-left: 20px;
    width: 80px;
    height: 80px;
  }
  .name {
    font-size: 14px;
    color: #ff1800;
  }
  .right {
    width: 220px;
    margin-left: 10px;
  }
  .round {
    margin-top: 10px;
  }
}
.all {
  height: 60px;
  padding-right: 25px;
}

.but {
  padding: 10px;
  .del {
    margin-left: 10px;
    padding: 10px;
    background-color: #e11488;
    color: #fff;
  }
}
span {
  margin-left: 10px;
}
.bottom {
  border-top: 1px solid #eee;
  position: fixed;
  bottom: 50px;
  background: #fff;
  width: 100%;
}
input {
  margin-left: 10px;
}
.zhanw {
  width: 100%;
  height: 120px;
}
</style>