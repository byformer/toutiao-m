<template>
  <div class="login-container">
    <van-nav-bar title="登录" />

    <van-form ref="form" @submit="onSubmit">
      <van-field
      type="number"
        v-model="mobile"
        name="mobile"
        label-width="20"
        placeholder="请输入手机号"
        maxlength="11"
        autocomplete="off"
        :rules="[
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' },
        ]"
      >
        <template #label>
          <i class="iconfont icon-shouji"></i>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        label-width="20"
        placeholder="请输入验证码"
        maxlength="6"
        autocomplete="off"
        :rules="[
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式不正确' },
        ]"
      >
        <template #label>
          <i class="iconfont icon-yanzhengma"></i>
        </template>
        <template #button>
          <!-- 按钮的默认类型，会触发表单提交，所以要指定明确的按钮类型 -->
          <!-- native-type="button"  表示将这个按钮变成一个普通按钮，不要触发表单提交 -->
          <van-button
            type="default"
            size="mini"
            round
            color="#eeeeee"
            class="sms_btn"
            native-type="button"
            @click="sendCode"
            :loading="isLoadingOfCode"
            loading-text="发送中..."
            :disabled="isShowCountDown"
          >
            <!-- template 标签只是一个临时包裹标签，本身不会渲染任何元素在页面上，只会将其内容渲染到页面上 -->
            <!-- @finish="isShowCountDown = false" -->
            <!-- millisecond：开始毫秒级倒计时 -->
            <van-count-down
              v-if="isShowCountDown"
              :time="6 * 1000"
              format=" ss 秒后重新获取 "
              @change="onChangeOfCountDown"
            />
            <template v-else>
              <!-- 一个 $nbsp; 就是一个空格 -->
              &nbsp;&nbsp;获取验证码&nbsp;&nbsp;
            </template>
          </van-button>
        </template>
      </van-field>
      <div style="margin: 16px">
        <!-- 原始类型：submit，表示是一个提交类型的按钮，会触发表单的默认提交行为 -->
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>

    <div class="footer">隐私条款</div>
  </div>
</template>

<script>
import { sendCode, login } from '../../api/user'
// import { Toast } from 'vant'

export default {
  name: 'LoginPage',
  data() {
    return {
      // 是否正在加载中（验证码请求）
      isLoadingOfCode: false,
      // 是否显示倒计时
      isShowCountDown: false,
      mobile: '',
      code: '',
    }
  },
  methods: {
    onChangeOfCountDown({ seconds }) {
      // console.log(seconds)
      if (seconds === 0) {
        this.isShowCountDown = false
      }
    },
    async sendCode() {
      // 1. 验证手机号码是否正确
      //  this.$refs.form 可以获取到 van-form 组件实例
      //  validate 方法是 van-form 组件身上的方法，会帮我们验证表单，会触发表单验证，返回值是一个 Promise
      //    验证通过，进入 Promise 成功的回调，验证不通过，进入 Promise 失败的回调
      await this.$refs.form.validate('mobile')
      // 代码如果能够走到这里，说明，表单验证通过了！！！
      // 只要验证通过，就先让按钮转圈圈转起来，防止重复点击
      this.isLoadingOfCode = true
      try {
        // 2. 请求 发送验证码 接口
        await sendCode(this.mobile)
        // 如果能够走到这里，说明请求发送成功
      } catch (err) {
        // console.log(err, 'err')
        // this.$toast.fail('发送验证码失败，请稍后重试！')
        this.$toast.fail(err.response.data.message)
        return
      } finally {
        // 不管成功失败都会执行
        // 改成false，让转圈圈停止
        this.isLoadingOfCode = false
      }
      // 3. 显示倒计时
      this.isShowCountDown = true
    },
    // 这个 onSubmit 函数，只有当表单校验通过时，才会执行
    async onSubmit(values) {
      console.log('submit', values)
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0, // 0 表示一直展示，不关闭，默认 2000 ms
      })
      try {
        // 1. 发请求
        const {data} = await login(values)
        this.$store.commit('setUser',data.data)
        
         this.$router.push({ name: 'layout' })
        // await new Promise(resolve => setTimeout(resolve, 5000))
        // 登录成功，
        // localStorage.setItem('token', JSON.stringify(res.data.data))
       
        // 要关闭加载中 toast
        this.$toast.clear()
        // 跳转首页，以后统统用 name 的方式跳路由，先死记，以后会给你们解释的~
       
       
      } catch (err) {
        // 登录失败
        // vant 的 toast 只能存在一个，后面弹出来的，会把前面的关掉，所以这里不需要手动调用 clear 关闭 loading
        this.$toast.fail(err.response.data.message)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.login-container {
  height: 100vh;
  background-color: #f6f8f9;

  .van-nav-bar {
    background-color: #3196fa;
    /deep/ .van-nav-bar__title {
      color: #fff;
    }
  }

  i.toutiao {
    font-size: 40px;
  }

  .sms_btn {
    color: #333 !important;
  }

  .footer {
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    font-size: 30px;
  }
}
</style>
