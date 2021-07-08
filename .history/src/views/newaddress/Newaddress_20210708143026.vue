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
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      :address-info="obj"
      @select="select(item)"
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
      areaList: areaList,
      searchResult: [],
      address: {},
      detailed: "",
      obj: {},
    };
  },
  components: {},
  methods: {
    onSave(address) {
      //点击确认时触发，发请求传参
      this.address = address;
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
          this.address.areaCode
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
      this.$router.back();
    },
    select() {
      console.log(item);
    },
  },
  mounted() {
    if (!this.$route.query.obj) {
      //如果点击新增地址到编辑页面就是没有传参，obj等于空
      this.obj = {};
    } else {
      //点击编辑传参就转化成对象赋值
      this.obj = JSON.parse(this.$route.query.obj);
    }
    console.log(this.obj);
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
</style>