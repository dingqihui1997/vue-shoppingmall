<template>
  <!-- 楼层顶部 -->
  <div>
    <div class="flex-ja box">
      <div class="floor"><slot name="num"></slot></div>
      <div><slot name="numname"></slot></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  components: {},
  methods: {},
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  width: 100%;
  height: 40px;
  color: #e0322b;
  background: #eee;
  padding: 10px;
}
.floor {
  width: 22px;
  height: 22px;
  background: #e0322b;
  border-radius: 100%;
  color: #fff;
  text-align: center;
  line-height: 25px;
  margin-right: 5px;
}
</style>