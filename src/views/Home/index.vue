<template>
  <div>
    <div class="my-login">
      <!-- 导航栏 -->
      <van-nav-bar>
        <van-button
          slot="title"
          class="search-btn"
          type="info"
          size="small"
          round
          ><van-icon name="search" /> 搜索</van-button
        >
      </van-nav-bar>
      <!-- 导航栏结束 -->

      <!-- 频道列表 -->
      <!-- 通过 v-model 绑定当前激活标签对应的索引值，默认情况下启用第一个标签。 -->
      <!-- 通过 animated 属性可以开启切换标签内容时的转场动画。 -->
      <!-- 通过 swipeable 属性可以开启滑动切换标签页。 -->
      <van-tabs v-model="active" animated swipeable>
        <van-tab :title="obj.name" v-for="obj in channel" :key="obj.id">
          <!-- 文章列表 -->
          <Article :channel="channel" />
          <!-- 文章列表结束 -->
        </van-tab>
         <!-- 用一个slot 占位 -->
        <div slot="nav-right" class="placeholder"></div>
        <div slot="nav-right" class="hamburger-btn">
          <i class="iconfont icon-gengduo"></i>
        </div>
      </van-tabs>

      <!-- 频道列表结束 -->
    </div>
  </div>
</template>

<script>
import Article from "./components/article-list"
import {getUserChnnel} from "@/api/user"
export default {
  name: "HomePage",
  data() {
    return {
      active: 0,
      channel:[]  // 频道列表
    };
  },
  components: {
    Article,
  },
  props: {},
  computed: {},
  watch: {},
  created() {
     this.getUserChnnel()
  },
  mounted() {},
  methods: {
     async getUserChnnel(){
      try{
        const {data} = await getUserChnnel()
      
        this.channel = data.data.channels
          
      }catch(err){
          this.$toast(' 获取频道检测失败')
        
      }
     }
  },
};
</script>

<style lang="less" scoped>

.van-nav-bar {
  background-color: #3196fa;
  /deep/ .van-nav-bar__title {
    color: #fff;
  }
}
/deep/ .van-icon::before {
  color: #fff;
  width: 32px;
  height: 32px;
}
.search-btn {
  width: 555px;
  height: 64px;
  background-color: #5babfa;
  border: none;
  font-size: 28px;
}
/deep/ .van-nav-bar__title {
  max-width: unset;
}
/deep/ .van-tabs__nav {
  .van-tabs__wrap{
     height: 82px;
  }
  .van-tab {
    border-right: 1px solid #edeff3;
    min-width: 200px;
    font-size: 30px;
    color: #777;
  }
  .van-tab--active{
    color: #ccc;
  }

  .van-tabs__line{
    bottom:0;
    width: 31px !important;
    height: 6px;
    background-color: #3296fa;
  }
  .placeholder{
     width: 50px;height: 82px;
     flex-shrink: 0;
  }
  .hamburger-btn{
    position: fixed;
    right:0;
    width: 66px;height: 82px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    opacity: 0.902;
    i.iconfont{
      font-size: 33px;
    }
    &:before{
      content: "";
      position: absolute;
      left: 0;
      width: 2px;
      height: 100%;
      background-image:url(@/assets/gradient-gray-line.png) ;
      background-size: contain;
    }
  }
}
/deep/   .van-tabs__nav{
    padding-bottom: 0;
  } 
  
  
</style>

