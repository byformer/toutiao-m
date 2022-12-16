<template>
  <div class="article-list">
<van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
  <van-cell v-for="item in list" :key="item" :title="item" />
</van-list>
  </div>
</template>

<script>
export default {

  data() {
    return {
      list: [], // 储存列表数据的数组
      loading: false, // 控制加载中 loading加载状态
      finished: false, // 控制数据加载结束的状态 
    };
  },
  components: {},
  props: {
    channel: {
      type: Array,
      required: true,
    },
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 初始化或滚动到底部的时候会触发调用，onLoad
    onLoad() {
      console.log("onLoad")
      // 1. 请求获取数据
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
      // 2. 把请求结果数据放到list数组中
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        // 3. 本次数据加载结束要把加载状态设置为结束
          //  loading 关闭以后才能触发下一次的加载更多
      this.loading = false
        // 加载状态结束
    
      //  4. 判断数据是否全部加载完成
        // 数据全部加载完成
            if (this.list.length >= 40) {
              // 如果没有数据了，把finished 设置 为 true，之后不再触发加载更多
          this.finished = true;
        } 
      }, 1000);
    },
  },
};
</script>

<style scoped lang="less">
.article-list{
  padding-bottom:100px;
  background-color: rgb(245, 247, 249);
}
</style>