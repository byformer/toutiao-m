<template>
  <div class="app">
    <van-nav-bar title="登录" id="box" />
    <!-- label="用户名" -->
    <van-form ref="form" @submit="onSubmit" >
      <!-- <i class="iconfont icon-shouji"></i> -->
      <van-field
        v-model="mobile"
        name="mobile"
        type="number"
        maxlength="11"
        class="iconfont icon-shouji"
        placeholder="请输入手机号"
        autocomplete="off"
        
        :rules="[{ required: true, message: '请输入手机号' },
                {pattern:/^1[3-9]\d{9}$/ , message:'手机号格式不正确'}
        ]"
      />

      <van-row type="flex">
        <van-col span="15">
          <van-field
            v-model="code"
            type="number"
            name="请输入验证码"
            class="iconfont icon-yanzhengma"
            placeholder="请输入验证码"
            maxlength="6"
            autocomplete="off"
            :rules="[{ required: true, message: '请填写用户名' },
              {pattern:/\d{6}$/ , message:'验证码格式不正确'}
            ]"
          />
        </van-col>
        <van-col span="9">
          <!-- native-type="button" 设置成普通按钮，不用提交-->
          <van-button native-type="button" id="btn"
          @click="sendCode"
          :loading="isLoadingCode"
          loading-text="发送中..."
          :disabled="isShowCountDown"
         
          >
           <van-count-down v-if="isShowCountDown"
            :time="time"
         @change="onChangeOfCountDown"
             format="ss秒后重新获取" id="btntime" />
            <!-- template 占位，不会产生任何影响 -->
            <template v-else>获取验证码 </template>
           <!--  @change="onChangeCount" -->
          </van-button>
        </van-col>
      </van-row>

      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>

    <div class="footer">隐私条款</div>
  </div>
</template>

<script>


import { sendCode} from "@/api/user";

export default {
  name: "LoginPage",
  components: {},
  props: {},
  data() {
    return {
        mobile: "",
        code: "",
      time:6 * 1000,
      // 显示倒计时
      isShowCountDown:false,
      // 验证码请求
      isLoadingCode:false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
  onChangeOfCountDown({ seconds }) {
      console.log(seconds)
      if (seconds === 0) {
        this.isShowCountDown = false
      }
    },
   async sendCode(){
    
      // 1. 验证手机号码是否正确
      // 验证通过进入promise成功的回调，验证不通过进入promise失败的回调
     await this.$refs.form.validate('mobile')
      // 代码如果走到这里，说明表单验证通过！
      // 只要验证通过就让按钮转圈圈，防止重复点击
    this.isLoadingCode = true
      try{
        // 2. 请求 发送验证码接口
      await sendCode(this.mobile)
       // 如果走到这里，说明发送请求成功！
        this.isShowCountDown = true
      }catch(err){

        Toast.fail(err.response.data.message);
      }
      // 3. 显示倒计时

      // 改成flase让转圈圈取消
     this.isLoadingCode = false
    },
     onSubmit(values) {
    },
  },
};
</script>
<style scoped lang="less">
.app{
  height:100vh;
}
#box {
  background-color: #3296fa;
  /deep/ .van-ellipsis {
    color: #fff;
  }
}
/deep/ .van-field__control {
  padding-left: 20px;
}
.van-button {
  font-size: 16px;
}
.van-field::before {
  color: #ccc;
  font-size: 40px;
}
#btn {
  border-radius: 30px;
  background-color: #ccc;
  height: 70px;
  width: 100%;
}
#btntime{
  font-size:18px;
}
.footer{
 position:fixed;
 bottom: 30px;
 left: 50%;
 transform:translateX(-50%) ;
 font-size:22px;
 }
</style>