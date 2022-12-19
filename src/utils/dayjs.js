import Vue from "vue";
import dayjs from "dayjs";

// 加载中文语言包
import 'dayjs/locale/zh-cn'

import relativeTime from "dayjs/plugin/relativeTime";
// 配置使用处理相对时间的场景
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')  // 全局使用 
// dayjs 默认语言是英文， 我们这里配置中文
// 定义一个全局过滤器 ， 然后就可以在任何组件的模版使用了
// 参数1：过滤器名称
// 参数2：过滤器函数
// 使用方式：{{表达式 ｜ 过滤器名称}}
Vue.filter('relativeTime',value =>{
        return dayjs().to(dayjs(value))
})
// 获取当前最新时间
