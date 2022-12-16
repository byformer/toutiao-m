<template>
  <div class="my-login">
    <!-- 已登录 -->
    <div class="contenter user-info" v-if="user">
      <div class="base-info">
        <div class="left">
          <van-image
            round
            class="avatar"
            fit="cover"
            :src="userInfo.photo"
          />
          <span>{{userInfo.name}}</span>
        </div>
        <div class="right">
          <van-button size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="data-statas">
        <van-row type="flex" justify="center">
          <van-col span="6" class="col-ment">
            <span class="count">{{userInfo.art_count}}</span>
            <span class="text">头条</span>
          </van-col>
          <van-col span="6" class="col-ment">
            <span class="count">{{userInfo.fans_count}}</span>
            <span class="text">关注</span>
          </van-col>
          <van-col span="6" class="col-ment">
            <span class="count">{{userInfo.follow_count}}</span>
            <span class="text">粉丝</span>
          </van-col>
          <van-col span="6" class="col-ment">
            <span class="count">{{userInfo.like_count}}</span>
            <span class="text">获赞</span>
          </van-col>
        </van-row>
      </div>
    </div>
    <div class="contenter not-login" v-else>
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="@/assets/mobile.png" alt="" />
        <span class="my-text">登录 / 注册</span>
      </div>
    </div>
    <!-- 收藏 -->
    <van-grid column-num="2" class="grid-nav"  clickable >
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
    <van-cell
      v-if="user"
      class="logout-cell"
      title="退出登录"
      clickable
      @click="onLogout"
    />
  </div>
  <!-- 未登录 -->
</template>

<script>
import { mapState } from "vuex";
import {getUserInfo} from "@/api/user";
export default {
  name: "MyPage",
  data() {
    return {
      userInfo:{}  //用户信息
    };
  },
  components: {},
  props: {},
  computed: {
    ...mapState(["user"]),
  },
  watch: {},
  created() {
    // 如果用户登录了。则请求加载用户数据
    if(this.user){
      this.loadUserInfo()
    }
  },
  mounted() {},
  methods: {

    onLogout() {
      //  退出提示
      //  在组件中要使用this.$dialog 来调用弹窗组件

      this.$dialog
        .confirm({
          title: "确认退出吗？",
        })
        .then(() => {
          //  确认退出：则清除登录状态 (容器中的 user 和 本地存储的 user)
          //  给容器中的serUser 设置为null
          this.$store.commit("setUser", null);
        })
        .catch(() => {
          // on cancel
          console.log("取消");
        });
    },

        async loadUserInfo(){
        try{
            const { data } = await getUserInfo()
            console.log(data)
            this.userInfo = data.data
        }catch(err){
            this.$toast("获取数据失败，请稍后重试 ")
        }
    },
  },
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
}

.grid-nav {
  margin-bottom: 15px;
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
  margin-top: 10px;
  text-align: center;
  color: #d86262;
}
</style>

