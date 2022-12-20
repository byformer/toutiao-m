<template>
  <div class="search-suggestion">
    <van-cell
    v-for="(text,index) in suggestions" :key="index"
     :title="text" icon="search"></van-cell>
  </div>
</template>

<script>
import {getSearchSuggestion} from "@/api/search";
export default {
  name: "SearchSuggestion",
  data() {
    return {
       suggestions:[]
    };
   
  },
  components: {},
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  computed: {},
  watch: {
  searchText:{
    // 当searchText发生改变的时候，就会调用handler的函数
    // 注意： handler 函数名是固定的
   handler(value){
        this.loadSearchSuggestion(value)

    },
    immediate:true,  // 该回调函数将会在侦听开始之后被立即调用
  }
  },
  created() {},
  mounted() {},
  methods: {
   async loadSearchSuggestion(q){
      try{
        const {data} = await getSearchSuggestion(q)
        
        this.suggestions= data.data.options
      }catch(err){
          this.$toast("数据获取失败，请稍后重试")
      }
    }
  },
};
</script>

<style lang="less" scoped>
</style>

