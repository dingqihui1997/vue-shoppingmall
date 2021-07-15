<template>
  <div class="box">
    <!-- 输入框没有值时，就显示历史记录-->
    <div v-if="value === '' && name !== null">
      <div class="flex-sb history">
        <div>历史搜索</div>
        <div><van-icon name="delete-o" @click="del" /></div>
      </div>
      <div v-if="search.length === 0" class="record flex-ja">
        暂无历史搜索记录
      </div>
      <div class="flex" v-else>
        <div
          v-for="(item, index) in search"
          :key="index"
          class="search"
          @click="click(item)"
        >
          {{ item.name }}
        </div>
      </div>
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
    <van-dialog v-model="show" show-cancel-button @confirm="confirm">
      <div class="del flex-ja">确认删除全部历史吗？</div>
    </van-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    list: {
      type: Array, //关键字搜索出来的数据
      required: true,
    },
    value: {
      type: String,
      required: true, //输入框的值
    },
  },
  data() {
    return {
      flag: false,
      arr: [], //储存的搜索历史
      search: [], //搜索历史记录
      show: false,
      name: null,
    };
  },
  components: {},
  methods: {
    details(item) {
      if (localStorage.getItem("name")) {
        //登录了才储存
        this.$utils.saveHistory({
          user: localStorage.getItem("name"),
          key: "search",
          data: this.value,
          attr: "name",
        });
      }
      this.$api //点击商品跳转到详情
        .goodOne(item)
        .then((res) => {
          this.$router.push({
            path: "/details",
            query: { id: item.id },
          });
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
    click(item) {
      //分发事件让父组件修改value值
      this.$emit("modify", item.name);
    },
    del() {
      this.show = true;
    },
    confirm() {
      localStorage.removeItem(`${localStorage.getItem("name")}searchHistory`); //删除历史搜索
      this.search = [];
    },
  },
  mounted() {
    this.name = localStorage.getItem("name"); //获取用户名
    let a = this.$utils.getHistory({
      user: `${localStorage.getItem("name")}`,
      key: "search",
    });
    if (a) {
      this.search = a;
    }
  },
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
.search {
  margin-top: 10px;
  margin-left: 10px;
  color: #666;
  background: #eee;
  padding: 5px;
  border-radius: 5px;
}
.del {
  margin-left: 10px;
  height: 50px;
}
.record {
  width: 100%;
  margin-top: 10px;
  color: #ff0000;
}
.history {
  margin-left: 10px;
  margin-right: 10px;
}
</style>