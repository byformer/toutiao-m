import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    name: "login",
    path: "/login",  // 配置登录页面路由
    component: () => import('@/views/Login/index.vue')
  },
  {
    name: 'layout',
    path: '/',  //  底部导航栏
    component: () => import('@/views/Layout/index.vue'),
    /* 出现问题 
      home首页跳转不了页面
      解决办法：添加重定向 ，删除active即可
    */
    redirect:"/home",
    children: [
      {
        name: "home",  // 配置首页
        path: "/home",  //  默认子路由
        component: () => import('@/views/Home/index.vue')
      },
      {
        name: "qa",
        path: "/qa",  // 配置登录页面路由
        component: () => import('@/views/qa/index.vue')
      },
      {
        name: "video",
        path: "/video",  // 配置登录页面路由
        component: () => import('@/views/Video/index.vue')
      },
      {
        name: "my",
        path: "/my",  // 配置登录页面路由
        component: () => import('@/views/My/index.vue')
      },
    ]
  },
  {
    name:"search",
    path:"/search",
    component: () => import("@/views/Search/index.vue")
  },
  {
    name:"article", // 设置动态id
    path:"/article/:articleId",
    component: () => import("@/views/article/index.vue"),
    props:true,  //  开启prop传参，说白了就是把路由参数映射到组件的prop数据中 
  }
]

const router = new VueRouter({
  routes
})

export default router