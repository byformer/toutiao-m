<template>
  <div class="article-container my-login">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div v-if="loading" class="loading-wrap">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div v-else-if="articleList.title" class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ articleList.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="articleList.aut_photo"
          />
          <div slot="title" class="user-name">{{ articleList.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ articleList.pubdate | relativeTime }}
          </div>
             <van-button
          v-if="articleList.is_followed"
            class="follow-btn"
            @click="onFollow"
            round
            :loading="followLoading"
            size="small"
            >已关注</van-button
          >
          <van-button
          v-else
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            :loading="followLoading"
            size="small"
            icon="plus"
            @click="onFollow"
            >关注</van-button
          >
          <!-- <van-button
            class="follow-btn"
            round
            size="small"
          >已关注</van-button> -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          ref="article-content"
          v-html="articleList.content"
        ></div>
        <van-divider>正文结束</van-divider>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div v-else-if="status === 404" class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button @click="loadArticle" class="retry-btn">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button class="comment-btn" type="default" round size="small"
        >写评论</van-button
      >
      <van-icon name="comment-o" info="123" color="#777" />
      <van-icon color="#777" name="star-o" />
      <van-icon color="#777" name="good-job-o" />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
  </div>
</template>

<script>
import { getArticleById } from "@/api/article";
import { ImagePreview } from "vant";
import {addFollow,deleteFollow} from "@/api/user"
export default {
  name: "ArticleIndex",
  components: {},
  props: {
    articleId: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      articleList: [], // 文章详情
      loading: true, // 加载中的loading状态
      status: 0, // 失败状态码
      followLoading:false,
    };
  },
  computed: {},
  watch: {},
  created() {
    this.loadArticle();
  },
  mounted() {},
  methods: {
    async loadArticle() {
      this.loading = true;
      try {
        const { data } = await getArticleById(this.articleId);

        this.articleList = data.data;
        /*    if(Math.random() > 0.5){
          JSON.parse('sdassad')
        } */
        //  请求成功，关闭loading
        // this.loading = false;
        setTimeout(() => {
          this.previewImage();
        }, 0);
     
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.status = 404;
        }
        this.$toast("获取数据失败", err);
      }
      // 不管成功还是失败，都需要关闭loading
      this.loading = false;
    },
    previewImage() {
      // 得到所有的img节点
      const articleContent = this.$refs["article-content"];
      const imgs = articleContent.querySelectorAll("img");
      const images = [];
      imgs.forEach((img,index) => {
        images.push(img.src);
        img.onclick = () => {
          ImagePreview({
            images,
            startPosition: index,  // 起始位置
          });
        };
      });
      
    },
   async onFollow(){
    this.followLoading = true // 展示关注按钮的loading状态
      try{
        if(this.articleList.is_followed){
          //  已关注，取消关注
          await deleteFollow(this.articleList.aut_id)
          
        }else{
          //  没有关注，添加关注
        await addFollow(this.articleList.aut_id)
          
        }
        this.articleList.is_followed = !this.articleList.is_followed
      }catch(err){
        let message = '操作失败，请重试'
        if(err.response && err.response.status === 400){
          message = '你不能关注你自己!'
        }
          this.$toast(message)
      }
      this.followLoading = false; // 关闭关注按钮的loading状态
    }
  },
};
</script>

<style scoped lang="less">
@import "./github-markdown.css";
.article-container {
  /deep/ .page-nav-bar {
    background-color: #3196fa;
    .van-nav-bar__content .van-ellipsis {
      color: #fff;
    }
    .van-nav-bar__arrow {
      color: #fff;
    }
  }
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
  /*   .article-content {
    font-size: 32px;
    word-break: break-all;
    word-wrap: break-word;
    overflow: hidden;
  }
  /deep/ .article-content p img {
    width: 100%;
  }
  .heading {
    font-size: 40px;
  } */
}
</style>

