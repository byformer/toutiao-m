/* 
    用户请求相关模块
*/

import request from "@/utils/request";

// 验证码
export function sendCode(mobile){
    request({
        method:"GET",
        url:`/v1_0/sms/codes/${mobile}`
    })
}
