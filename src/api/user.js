/* 
    用户请求相关模块
*/
import request from "@/utils/request";

// 容器模块
import store from "@/store/index"
// 验证码
export function sendCode(mobile){
   return request({
        method:"GET",
        url:`/v1_0/sms/codes/${mobile}`
    })
}

// 登录
//  data - { mobile, code } 
export function login(data) {
    return request({
      method: 'POST',
      url: '/v1_0/authorizations',
      data,
    })
  }


  // 获取用户信息
export function getUserInfo(){
     return request({
        method:"GET",
        url:'/v1_0/user',
        //  发送请求头数据
        // headers:{
        //     Authorization:`Bearer ${store.state.user.token}`
        // }
    })
}


// 获取用户的频道
export function getUserChnnel(){
   return request({
      method:"GET",
      url:"/v1_0/channels",

   })
}