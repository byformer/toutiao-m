import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage.js'
const TOKEN = 'TOUTIAO_USER'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem(TOKEN)
  },
  getters: {
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // 保存本地数据
      setItem(TOKEN,state.user)
      console.log(getItem(TOKEN))
    }
  },
  actions: {
  },
  modules: {
  }
})
