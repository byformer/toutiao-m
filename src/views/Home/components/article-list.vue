<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :success-duration="1500"
      :success-text="refreshSuccessText"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <ArticleItem
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        />
        <!--      <van-cell
         
          
        /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from "@/api/article";
import ArticleItem from "@/components/article-item";
export default {
  data() {
    return {
      list: [], // 储存列表数据的数组
      loading: false, // 控制加载中 loading加载状态
      finished: false, // 控制数据加载结束的状态
      timestamp: null, // 请求获取下一页数据的时间戳
      error: false, // 默认是提示失败
      isLoading: false, // 下拉刷新状态
      refreshSuccessText: "刷新成功", // 下拉刷新成功提示文本
    };
  },
  components: {
    ArticleItem,
  },
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 初始化或滚动到底部的时候会触发调用，onLoad
    async onLoad() {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道 ID
          // 请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
          // timestamp 简单理解就是请求数据的页码
          // 请求的第1页数据：当前最新的时间戳
          //  用于请求之后数据的时间戳会在当前请求结果返回给你
          timestamp: this.timestamp || Date.now(),
        });

        const { results } = data.data;
        console.log(results)
        //  数组的展开操作符，它会把元素一个一个拿出来
        // 2. 把请求结果数据放到list数组中
        this.list.push(...results);
        // 3. 本次数据加载结束要把加载状态设置为结束
        this.loading = false;
        //  4. 判断数据是否全部加载完成
        if (results.length) {
          //  更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp;
        } else {
          // 没有数据了，将finished 设置为true，不再load加载更多了
          this.finished = true;
        }
      } catch (err) {
        console.log("请求失败", err);
        this.error = true;
        this.loading = false;
      }
      // 1. 请求获取数据
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求

      //  loading 关闭以后才能触发下一次的加载更多

      // 加载状态结束

      // 数据全部加载完成

      // 如果没有数据了，把finished 设置 为 true，之后不再触发加载更多
    },

    // 当下拉刷新的时候会触发该函数
    async onRefresh() {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道 ID
          // 请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
          // timestamp 简单理解就是请求数据的页码
          // 请求的第1页数据：当前最新的时间戳
          //  用于请求之后数据的时间戳会在当前请求结果返回给你
          timestamp: Date.now(), // 下拉菜单每次获取 最新的值
        });
        // 将数据追加到列表的顶部
        const { results } = data.data;
        this.list.unshift(...results);
        // 关闭下拉刷新的loading状态
        this.isLoading = false;
        // 更新下拉刷新成功提示的文本
        this.refreshSuccessText = `刷新成功。更新了${results.length}条数据`;
      } catch (err) {
        this.refreshSuccessText = "刷新失败";
        this.loading = false;
      }

      /*   setTimeout(() => {
        this.$toast('刷新成功');
        this.isLoading = false;
        this.count++;
      }, 1000); */
    },
  },
};
</script>

<style scoped lang="less">
.article-list {
  padding-bottom: 100px;
  background-color: rgb(245, 247, 249);
  height: 93vh;
  overflow-y: auto;
}
</style>