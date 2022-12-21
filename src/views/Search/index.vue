<template>
  <div class="search-container my-login">
    <!-- 顶部搜索栏 -->
    <!-- 
         在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。
     -->
    <form class="search-form" action="/">
      <van-search
        v-model="searchText"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 搜索栏结束 -->


    <!-- 搜索结果 -->
    <SearchResult v-if="isResultShow"
    :search-text="searchText "
     />
    <!-- 搜索结果结束 -->

      <!-- 联想建议 -->
    <SearchSuggestion
    :search-text="searchText"
    @search="onSearch"
     v-else-if="searchText" />
    <!-- 联想建议结束 -->

    <!-- 搜索历史记录 -->
    <SearchHistory v-else />
    <!-- 搜索历史记录结束 -->
  
  </div>
</template>

<script>
import SearchResult from "./components/search-result";
import SearchHistory from "./components/search-history";
import SearchSuggestion from "./components/search-suggestion";
export default {
  name: "searchPage",
  data() {
    return {
      searchText: "",
      isResultShow: false, // 控制搜索结果的显示
    };
  },
  components: {
    SearchResult,
    SearchHistory,
    SearchSuggestion,
  },
  props: {},
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onSearch(val) {
      this.searchText= val 
      this.isResultShow = true
    },
    onCancel() {
      this.$router.back();
    },
  },
};
</script>

<style lang="less" scoped>
.search-container {
  padding-top:113px;
  .van-search__action {
    color: #fff;
  }
  .search-form{
    position: fixed;
    top: 0;right: 0;
    left: 0;z-index: 10;
  }
}
</style>

