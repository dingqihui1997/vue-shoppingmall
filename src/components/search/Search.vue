<template>
  <div class="box">
    <!-- 输入框没有值时，就显示历史记录-->
    <div v-if="value === ''">
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
          {{ item }}
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
      search: [], //
      show: false,
    };
  },
  components: {},
  methods: {
    details(item) {
      //点击搜索出来的商品时触发
      //储存历史记录
      //先获取储存的值，如果有值，就给arr
      if (localStorage.getItem("search")) {
        this.arr = JSON.parse(localStorage.getItem("search")); //如果有值就等于arr
        let num = null;
        num = this.arr.find((item) => {
          //去重过滤，如果找到返回元素，没找到返回undefined
          return item === this.value;
        });
        if (!num) {
          //如果是没找到就是false 然后再push
          this.arr.push(this.value);
        }
      } else {
        //如果开始没储存，就push到arr再储存
        this.arr.push(this.value);
      }
      console.log(this.arr);
      localStorage.setItem("search", JSON.stringify(this.arr));
      this.$api //点击商品跳转到详情
        .goodOne(item)
        .then((res) => {
          this.$router.push({
            path: "/details",
            query: { id: item.id },
          });
          // console.log(res);
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
    click(item) {
      //分发事件让父组件修改value值
      this.$emit("modify", item);
    },
    del() {
      this.show = true;
    },
    confirm() {
      localStorage.removeItem("search");
      this.search = [];
    },
  },
  mounted() {
    this.search = JSON.parse(localStorage.getItem("search"));
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