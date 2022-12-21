<template>
  <div class="search-suggestion">
    <van-cell v-for="(text, index) in suggestions"
     :key="index"
     @click="$emit('search',text)"
     icon="search">
      <div slot="title" v-html="highlight(text)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from "@/api/search";
//  按需加载有好处：只会把使用到的成员打包到结果中。
import { debounce } from "lodash";
export default {
  name: "SearchSuggestion",
  data() {
    return {
      suggestions: [],
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
    searchText: {
      // 当searchText发生改变的时候，就会调用handler的函数
      // 注意： handler 函数名是固定的

      // debounce 函数
      // 参数1: 一个函数
      // 参数2: 延迟时间，单位是毫秒
      handler: debounce(function (value) {
        this.loadSearchSuggestion(value);
      }, 200),

      immediate: true, // 该回调函数将会在侦听开始之后被立即调用
    },
  },
  created() {},
  mounted() {},
  methods: {
    async loadSearchSuggestion(q) {
      try {
        const { data } = await getSearchSuggestion(q);

        this.suggestions = data.data.options;
      } catch (err) {
        this.$toast("数据获取失败，请稍后重试");
      }
    },
    highlight(text) {
      const highlightStr = `<span style="color:#3296fa">${this.searchText}</span>`;

      // 如果需要根据数据变量动态的创建正则表达式，则需要手动new RegExp
      // new RegExp 正则表达式的结构函数
      //  参数1: 匹配模式字符串，它会根据这个字符串创建正则 对象
      //  参数2: 匹配模式，要写到字符串中

      if (this.suggestions[0] !== null) {
        const reg = new RegExp(this.searchText, "gi");
        return text.replace(reg, highlightStr);
      }else{
        return
      }
     /*  const reg = new RegExp(this.searchText, "gi");
      return text.replace(reg, highlightStr); */
    },
  },
};
</script>

<style lang="less" scoped>

</style>

