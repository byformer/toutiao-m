<template>
  <div>
    <div class="my-login">
      <!-- 导航栏 -->
      <van-nav-bar fixed>
        <van-button
          slot="title"
          class="search-btn"
          type="info"
          size="small"
          to="/search"
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
        <van-tab
          :title="channel.name"
          v-for="channel in channels"
          :key="channel.id"
        >
          <!-- 文章列表 -->
          <Article :channel="channel" />
          <!-- 文章列表结束 -->
        </van-tab>
        <!-- 用一个slot 占位 -->
        <div slot="nav-right" class="placeholder"></div>
        <div slot="nav-right"
         class="hamburger-btn"
          @click="isShow = true">
          <i class="iconfont icon-gengduo"></i>
        </div>
      </van-tabs>

      <!-- 频道列表结束 -->

      <!-- 频道编辑弹出层 -->
      <van-popup
        v-model="isShow"
        closeable
        position="bottom"
         close-icon-position="top-left"
        :style="{ height: '100%' }"
      >
      <ChannelEdit 
      :myChannels="channels"
      :active="active"
      @updata-active="onUpdataActive"
      />
      </van-popup>
    </div>
  </div>
</template>

<script>
import Article from "./components/article-list";
import { getUserChnnel } from "@/api/user";
import ChannelEdit from "./components/channel-edit";
import { mapState } from "vuex"
import {getItem} from "@/utils/storage"
 export default {
  name: "HomePage",
  data() {
    return {
      active: 0,
      channels: [], // 频道列表
      isShow:false,  // 控制编辑频道弹出层的显示状态
    };
  },
  components: {
    Article,
    ChannelEdit,
  },
  props: {},
  computed: {
    ...mapState(["user"])
  },
  watch: {},
  created() {
    this.loadChannels();
  },
  mounted() {},
  methods: {
    async loadChannels() {
      try {
      /*   const { data } = await getUserChnnel();
        this.channels = data.data.channels; */
        let channels = []
        if(this.user){
          //  已登录，请求获取用户频道列表
           const { data } = await getUserChnnel();
           channels = data.data.channels
        }else{
          // 未登录，判断是否有本地的频道列表数据
          const localChannels = getItem("TOUTIAO_CHANNELS")
          //  有，拿过来用
          if(localChannels){
            channels = localChannels
          }else{
            //  没有，请求默认频道列表
            const { data } = await getUserChnnel();
            channels = data.data.channels
          }
        }
        this.channels = channels
      } catch (err) {
        this.$toast(" 获取频道检测失败");
      }
    },
    onUpdataActive(index ,isShow = true){
      // 更新激活的频道项
        this.active  = index
        // 关闭编辑频道弹层
        this.isShow = isShow
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
  .van-tab {
    border-right: 1px solid #edeff3;
    min-width: 200px;
    font-size: 30px;
    color: #777;
  }
  .van-tab--active {
    color: #ccc;
  }

  .van-tabs__line {
    bottom: 0;
    width: 31px !important;
    height: 6px;
    background-color: #3296fa;
  }
  .placeholder {
    width: 50px;
    height: 82px;
    flex-shrink: 0;
  }
  .hamburger-btn {
    position: fixed;
    right: 0;
    width: 66px;
    height: 82px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    opacity: 0.902;
    i.iconfont {
      font-size: 33px;
    }
    &:before {
      content: "";
      position: absolute;
      left: 0;
      width: 2px;
      height: 100%;
      background-image: url(@/assets/gradient-gray-line.png);
      background-size: contain;
    }
  }
}
/deep/ .van-tabs__nav {
  padding-bottom: 0;
}
/deep/ .van-tabs__wrap {
  height: 82px;
  position: fixed;
  top: 90px;
  z-index: 999;
  left: 0;
  right: 0;
}
.my-login {
  padding-top: 175px;
  padding-bottom: 100px;
}
/deep/ .van-icon-cross::before{
  color:#ccc
}
</style>

