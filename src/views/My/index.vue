<template>
  <div>
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
      <div class="data-statas"></div>
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
    background-color: yellow;
    padding: 90px 32px 23px;
    box-sizing: border-box;
    display:flex;
    justify-content: space-between;
    align-items: center;
    .left{
      .avatar{
        width: 132px;height: 132px;
      }
    }
  }
  .data-statas {
    height: 150px;
    background-color: #ccc;
  }
}
</style>

