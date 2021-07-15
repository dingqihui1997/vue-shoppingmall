<template>
  <!-- 地址l列表 -->
  <div class="box">
    <top>
      <template #left
        ><van-icon name="arrow-left" class="leftarrow" @click="back"
      /></template>
      <template #center>地址列表</template>
    </top>
    <div v-if="address.length === 0" class="blank flex-ja">暂无收货地址~~</div>
    <van-address-list
      v-model="chosenAddressId"
      :list="address"
      default-tag-text="默认"
      @edit="onEdit"
      @add="onAdd"
      @select="select"
    ></van-address-list>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      address: [], //地址列表
      chosenAddressId: 1,
    };
  },
  components: {},
  methods: {
    onEdit(item, index) {
      //点击修改，需要把目前内容赋到地址编辑里面的表单上
      localStorage.setItem("cancel", 1); //点击编辑的时候储存一个值，来控制删除按钮
      this.$router.push({
        path: "/newaddress",
        query: { obj: JSON.stringify(item) },
      });
    },
    onAdd() {
      //新增地址
      this.$router.push("/newaddress");
    },
    back() {
      if (localStorage.getItem("flag")) {
        //点击我的地址管理储存的值
        this.$router.push("/my");
      } else {
        this.$router.push("/Settlement");
      }
    },
    getAddress() {
      //获取用户的地址
      this.$api
        .getAddress()
        .then((res) => {
          this.address = res.address;
          let list = this.address.filter((item) => {
            //过滤出默认地址
            return item.isDefault === true;
          });
          let num = this.address.indexOf(list[0]); //查找默认地址是第几个下标
          this.address.splice(num, 1); //先在原数组删除，
          this.address.unshift(list[0]); //然后添加到第一项
          this.address.map((item) => {
            //新增一个属性动态绑定，才能单选一个
            this.$set(item, "id", item._id);
            if (item.isDefault) {
              //勾选默认的
              this.chosenAddressId = item.id;
            }
          });
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
    select(item) {
      //选择地址时做的操作
      if (localStorage.getItem("flag")) {
        //如果储存的有值，就不做操作，从结算过来的
      } else {
        this.$router.back(); //没有值就直接返回上一步了
        localStorage.setItem("Address", JSON.stringify(item)); //item是选择的哪一个地址
      }
    },
  },
  mounted() {
    this.getAddress();
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.new {
  position: absolute;
  bottom: 0;
  height: 50px;
  background: #ff4444;
  color: #fff;
}
.blank {
  border-top: 1px solid #eee;
  padding-top: 20px;
  color: #bcc1d1;
}
</style>