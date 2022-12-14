/* 
    用户请求相关模块
*/

import request from "@/utils/request";

// 用户登录

export const login = data =>{
    return request({
        method:"POST",
        url:"/v1_0/authorizations",
        data
    })
}