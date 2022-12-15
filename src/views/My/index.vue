<template>
  <div class="my-login">
    <div class="contenter not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="@/assets/mobile.png" alt="" />
        <span class="my-text">登录 / 注册</span>
      </div>
    </div>

    <div class="contenter user-info">
      <div class="base-info">
        <div class="left">
          <van-image
            round
            class="avatar"
            fit="cover"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
          <span>蔡徐坤</span>
        </div>
        <div class="right">
          <van-button size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="data-statas">
        <van-row type="flex" justify="center">
          <van-col span="6" class="col-ment">
            <span class="count">10</span>
            <span class="text">头条</span>
          </van-col>
          <van-col span="6" class="col-ment">
            <span class="count">98</span>
            <span class="text">关注</span>
          </van-col>
          <van-col span="6" class="col-ment">
            <span class="count">10</span>
            <span class="text">粉丝</span>
          </van-col>
          <van-col span="6" class="col-ment">
            <span class="count">10</span>
            <span class="text">获赞</span>
          </van-col>
        </van-row>
      </div>
      <!-- 收藏 -->
      <van-grid column-num="2" class="grid-nav">
        <van-grid-item class="grid-item">
          <i slot="icon" class="iconfont icon-shoucang"></i>
          <span slot="icon" class="text">收藏</span>
        </van-grid-item>
        <van-grid-item class="grid-item">
          <i slot="icon" class="iconfont icon-lishi"></i>
          <span slot="icon" class="text">收藏</span>
        </van-grid-item>
      </van-grid>

      <!-- 消息通知 -->
      <van-cell title="消息通知" is-link />
      <van-cell class="mb-9" title="小智同学" is-link />
      <van-cell class="logout-cell" title="退出登录"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {};
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
.contenter {
  height: 400px;
  background: url("@/assets/banner.png");
  background-size: cover;
}
.not-login {
  display: flex;
  justify-content: center;
  align-content: center;
  .login-btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    .mobile-img {
      width: 132px;
      height: 132px;
    }
    .my-text {
      font-size: 16px;
      color: #fff;
      margin-top: 15px;
      text-align: center;
    }
  }
}
.user-info {
  .base-info {
    height: 250px;

    padding: 90px 32px 23px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      span {
        font-size: 30px;
        color: #fff;
      }
      .avatar {
        width: 132px;
        height: 132px;
        margin-right: 23px;
        border: 5px solid #fff;
      }
    }
  }
  .data-statas {
    // height: 150px;

    .col-ment {
      height: 150px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      color: #fff;
      .count {
        font-size: 36px;
      }
      .text {
        font-size: 23px;
      }
    }
  }
  .grid-nav {
    .grid-item {
      height: 140px;

      i.iconfont {
        font-size: 45px;
      }
      span.text {
        font-size: 28px;
      }
      .icon-shoucang {
        color: #eb5253;
      }
      .icon-lishi {
        color: #ff9d1d;
      }
    }
    /deep/ .van-hairline .van-grid-item__icon-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  .logout-cell {
    text-align: center;
    color: #d86262;
  }
   .mb-9 {
    // margin-bottom: px;
  }
}
.my-login{
  background-color:rgb(245,247,249)
}
</style>

