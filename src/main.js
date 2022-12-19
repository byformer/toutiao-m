import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/style/index.less';  // 引入less
import "@/plugins/vant"        // 引入vant
import "amfe-flexible"   // 引入移动端适配
import "./utils/dayjs"  // 加载dayjs初始配置

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
