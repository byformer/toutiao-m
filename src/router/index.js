import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
      name:"login",
      path:"/login",  // 配置登录页面路由
      component:() => import('@/views/Login/index.vue')
    }
]

const router = new VueRouter({
  routes
})

export default router