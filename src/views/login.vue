<template>
  <div>
    <van-nav-bar title="登录" id="box" />
    <!-- label="用户名" -->
    <van-form @submit="onSubmit">
      <!-- <i class="iconfont icon-shouji"></i> -->
      <van-field
        v-model="user.mobile"
        name="请输入手机号"
        type="number"
        maxlength="11"
        class="iconfont icon-shouji"
        placeholder="请输入手机号"
      />
      <!-- <div class="myPassword"></div> -->

      <van-row type="flex">
        <van-col span="18">
          <van-field
            v-model="user.code"
            type="password"
            name="请输入验证码"
            class="iconfont icon-yanzhengma"
            placeholder="请输入验证码"
            maxlength="11"
          />
        </van-col>
        <van-col span="6">
          <van-button native-type="button" id="btn">发送验证码</van-button>
        </van-col>
      </van-row>

      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import {login} from "@/api/user";

export default {
  name: "LoginPage",
  components: {},
  props: {},
  data() {
    return {
      user:{
        mobile:"",
        code:"",
      }
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 增加toast交互
    // async onLogin(){
    //     // 开始转圈
    //     this.$toast.loading({
    //         duration:0,  // 持续时间， 0表示持续展示不停止
    //         forbidClick:true, // 是否禁止背景点击
    //         massage:"登录中...", //提示消息
    //     })
    // },
    //  
   async onSubmit() {
     const user = this.user;
       try {
        const res = await login(user)
        console.log('登录成功', res)
        this.$$toast.success("登录成功")
    } catch (err) {
        if (err.response.status === 400) {
            console.log('登录失败', err)
            // this.$$toast.fail("登录失败，手机或验证码错误")
        }
    }
    }
  },
};
</script>
<style scoped lang="less">
#box {
  background-color: #3296fa;
  /deep/ .van-ellipsis {
    color: #fff;
  }
}
/deep/ .van-field__control {
  padding-left: 20px;
}
.van-button{
    font-size: 16px;
}
.van-field::before{
    color:#ccc;
    font-size:40px;
}
#btn{
    border-radius: 30px;
    background-color: #ccc;
    height: 70px;
}
</style>