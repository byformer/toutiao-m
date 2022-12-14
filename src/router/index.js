import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
      path:"/login",  // 配置登录页面路由
      name:"login",
      component:() => import('@/views/login')
    }
]

const router = new VueRouter({
  routes
})

export default router