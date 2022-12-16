<template>
 <div>
    <!-- 导航栏 -->
   <van-nav-bar>
    <van-button slot="title"
    class="search-btn"
      type="info"
      size="small"
      round
    ><van-icon name="search" /> 搜索</van-button>
  
   </van-nav-bar>


 </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
        value:""
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
.van-nav-bar {
    background-color: #3196fa;
    /deep/ .van-nav-bar__title {
      color: #fff;
    }
  }
 /deep/ .van-icon::before{
    color:#fff;
    width: 32px;height:32px;
  }
  .search-btn{
    width: 555px;
    height: 64px;
    background-color:#5babfa;
    border:none;
    font-size: 28px;
    }
 /deep/ .van-nav-bar__title{
    max-width: unset;
  }
</style>

