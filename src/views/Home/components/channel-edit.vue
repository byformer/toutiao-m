<template>
  <div class="channel-edit">
    <!--我的频道 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button type="danger" class="edit-btn" plain size="mini" round
        >编辑</van-button
      >
    </van-cell>

    <van-grid :gutter="10" class="my-grid">
      <van-grid-item
        class="grid-item"
        icon="clear"
        v-for="(channel,index) in myChannels"
        :key="index"
        :text="channel.name"
      />
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <!--频道推荐 -->
    <van-grid :gutter="10" class="recommend-grid">
      <van-grid-item
        class="grid-item"
        icon="plus"
        v-for="value in 8"
        :key="value"
        text="文字"
      />
    </van-grid>
  </div>
</template>

<script>
export default {
  name: "ChannelEdit",
  data() {
    return {};
  },
  components: {},
  props: {
    myChannels:{
    type:Array,
    required:true,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.channel-edit {
  padding: 85px 0;

  /deep/ .van-button--plain.van-button--danger {
    width: 90px;
    height: 40px;
  }
  .van-cell__value {
    display: flex;
    justify-content: right;
    align-items: center;
  }

  .title-text {
    font-size: 32px;
    color: #333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap; // 不允许折行
      background-color: #f4f5f6;
      .van-grid-item__text {
        font-size: 28px;
        color: #222;
      }
    }
  }
  /deep/ .van-grid-item__icon::before {
    color: #222;
  }

  /deep/ .recommend-grid {
    .van-grid-item__content {
      flex-direction: row;
      .van-icon-plus {
        font-size: 28px;
      }
      .van-grid-item__icon + .van-grid-item__text {
        margin-top: 0;
        margin-right: 6px;
      }
    }
  }

  /deep/ .my-grid {
    .van-icon-clear {
      position: absolute;
      right: -10px;
      top: -10px;
      font-size: 30px;
      z-index: 3;
    }
    .van-icon-clear::before {
      color: #cacaca;
    }
    .van-grid-item__icon + .van-grid-item__text {
      margin-top: 0;
    }
  }
}
</style>

