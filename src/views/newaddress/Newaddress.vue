<template>
  <!-- 编辑地址 -->
  <div>
    <top>
      <template #left
        ><van-icon name="arrow-left" class="leftarrow" @click="back"
      /></template>
      <template #center>编辑地址</template>
    </top>
    <van-address-edit
      :area-list="areaList"
      show-postal
      :show-delete="show"
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      :address-info="obj"
    />
  </div>
</template>

<script>
import { areaList } from "@vant/area-data";
export default {
  name: "",
  props: {},
  data() {
    return {
      areaList: areaList, //地址类别
      searchResult: [],
      address: {}, //用户填写的内容
      detailed: "",
      obj: {}, //收货人初始列表
      show: null, //控制删除按钮
    };
  },
  components: {},
  methods: {
    onSave(address) {
      //点击保存时触发，就新增发请求传参  address是当时填写的表单内容
      let id = address.id ? address.id : "";
      console.log(address);
      this.address = address; //拼接详细地址
      this.detailed = `${this.address.province}${this.address.city}${this.address.county}${this.address.addressDetail}`;
      console.log(this.detailed);
      this.$api
        .postAddress(
          this.address.name,
          this.address.tel,
          this.detailed,
          this.address.isDefault,
          this.address.province,
          this.address.city,
          this.address.county,
          this.address.addressDetail,
          this.address.areaCode,
          id
        )
        .then((res) => {
          console.log(res);
          if (res.code === 200) {
            this.$router.back();
            //添加成功
            this.$toast(res.msg);
          }
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
    onDelete() {
      //点击确认删除时的操作
      console.log(this.obj);
      this.$api
        .deleteAddress(this.obj._id)
        .then((res) => {
          console.log(res);
          if (res.code === 200) {
            this.$toast(res.msg);
            this.$router.push("/address");
          }
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
    back() {
      localStorage.removeItem("cancel"); //点击返回按钮就清空控制
      this.$router.push("/address");
    },
  },
  mounted() {
    if (!this.$route.query.obj) {
      //如果是新增地址到编辑页面就是没有传参，obj等于空 ，表单内容为空
      this.obj = {};
    } else {
      //如果是点击编辑传参就转化成对象赋值
      this.obj = JSON.parse(this.$route.query.obj);
    }
    //获取本地储存的值，如果用户点击编辑，就显示删除按钮，如果点击新增就隐藏删除按钮
    this.show = Boolean(Number(localStorage.getItem("cancel")));
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
</style>