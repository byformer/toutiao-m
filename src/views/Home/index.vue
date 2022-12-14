<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <router-view />

    <!-- 导航标签 -->
    <van-tabbar class="layout-tabbar" v-model="active">
      <van-tabbar-item >
        <i slot="icon" class="iconfont icon-shouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item>
        <i slot="icon" class="iconfont icon-shipin"></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item>
        <i slot="icon" class="iconfont icon-wenda"></i>
        <span class="text">问答</span>
        </van-tabbar-item
      >
      <van-tabbar-item>
        <i slot="icon" class="iconfont icon-wode"></i>
        <span class="text">我的</span>
        </van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      active: 0,
    };
  },
  components: {},
  props: {},
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.layout-container{
  .layout-tabbar{
    i{
      font-size: 40px;
    }
    span{
      font-size: 20px;
    }
  }
}
</style>

