<template>
  <div class="city-index">
    <div class="top">
      <top>
        <template #left>
          <div @click="back"><van-icon name="arrow-left" /></div>
        </template>
        <template #center>城市列表</template>
      </top>
    </div>
    <div class="search">
      <van-sticky>
        <van-search v-model="value" placeholder="请输入城市关键词" />
      </van-sticky>
    </div>
    <!-- 没有搜索时才出现 -->
    <div v-if="list.length === 0">
      <div class="current">当前城市</div>
      <div class="city flex-a">
        <div class="local">{{ city }}</div>
      </div>
      <div class="current">热门城市</div>
      <div class="hot flex-w">
        <div
          v-for="(item, index) in hot"
          :key="index"
          class="hotcity"
          @click="change(item.name)"
        >
          {{ item.name }}
        </div>
      </div>
      <!-- 所有城市 -->
      <!-- 循环对象 abc-->
      <van-index-bar :index-list="Object.keys(cities)">
        <template v-for="(val, key) in cities">
          <van-index-anchor :index="key" :key="key" />
          <!-- 在循环对象的value -->
          <van-cell
            :title="item.name"
            v-for="item in cities[key]"
            :key="item.id"
            @click="change(item.name)"
          />
        </template>
      </van-index-bar>
    </div>
    <!-- 搜索时显示的数据 -->
    <div v-if="list.length > 0">
      <div
        v-for="(item, index) in list"
        :key="index"
        class="list flex-a"
        @click="change(item)"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
import position from "../../lib/city";
export default {
  name: "",
  props: {},
  data() {
    return {
      value: "",
      hot: position.data.hotCities, //热门城市
      cities: position.data.cities, //所有城市
      list: [],
    };
  },
  components: {},
  methods: {
    change(name) {
      //点击地址时就修改vuex里面和储存的数据
      this.$store.commit("setCity", name);
      localStorage.setItem("position1", name);
      this.$router.push("/");
    },
    back() {
      this.$router.push("/");
    },
  },
  mounted() {},
  computed: {
    city() {
      return this.$store.state.city; //获取共享数据
    },
  },
  watch: {
    value(val) {
      // console.log(val);
      for (let i in this.cities) {
        //循环对象
        // console.log(i);
        this.cities[i].map((item) => {
          //循环对象里面的val
          if (
            item.name.includes(val) === true ||
            item.spell.includes(val) === true
          ) {
            this.list.push(item.name);
          }
        });
      }
      // console.log(this.list);
      if (val === "") {
        this.list = [];
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.city-index {
  width: 100%;
  height: 100%;
  background: #eee;
}
.van-search {
  background: #eeeeee;
}
.current {
  margin-left: 5px;
  font-size: 14px;
}
.city {
  width: 100%;
  background: #fff;
  height: 35px;
  margin-top: 5px;
  padding-left: 15px;
  font-size: 16px;
  margin-bottom: 10px;

  .local {
    width: 100px;
    height: 25px;
    border: 1px solid #ccc;
    text-align: center;
  }
}
.hot {
  margin-top: 5px;
  width: 100%;
  height: 80px;
  background: #fff;
  padding-right: 10px;
  padding-left: 15px;
  .hotcity {
    width: 100px;
    height: 25px;
    border: 1px solid #ccc;
    text-align: center;
    margin: 5px;
  }
  .van-index-bar__index {
    line-height: 20px;
  }
}
.search {
  width: 100%;
  height: 54px;
}
.list {
  width: 100%;
  height: 40px;
  background-color: #fff;
  padding-left: 10px;
  border-bottom: 1px solid #eee;
}
</style>