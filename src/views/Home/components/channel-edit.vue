<template>
  <div class="channel-edit">
    <!--我的频道 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        type="danger"
        class="edit-btn"
        plain
        size="mini"
        round
        @click="isEdit = !isEdit"
        >{{ isEdit ? "完成" : "编辑" }}</van-button
      >
    </van-cell>

    <van-grid :gutter="10" class="my-grid">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in myChannels"
        :key="index"
        @click="onMyChannelClick(channel, index)"
      >
        <van-icon
          slot="icon"
          name="clear"
          v-show="isEdit && !flexChannels.includes(channel.id)"
        ></van-icon>
        <!-- 
        v-bind:class 语法
        一个对象，对象中的key表示要作用的css类名
        对象的中 value 要计算出布尔值
        true 则作用该类名
        false 不作用该类名
       -->
        <span class="text" :class="{ active: index === active }" slot="text">{{
          channel.name
        }}</span>
      </van-grid-item>
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
        v-for="(channel, index) in recommendChannels"
        :key="index"
        :text="channel.name"
        @click="onAddChannel(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from "@/api/channel";
export default {
  name: "ChannelEdit",
  data() {
    return {
      allChannels: [], // 所有频道
      isEdit: false, // 控制编辑状态的显示
      flexChannels: [0], // 固定频道，不允许删除
    };
  },
  components: {},
  props: {
    myChannels: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
  },
  computed: {
    // 计算属性会观测内部依赖数据的变化
    //  如果依赖的数据发生变化，则计算属性会重新执行

    recommendChannels() {
    //   const channels = [];
    return  this.allChannels.filter((channel) => {
        //  find 也是遍历数组，找到满足条件的元素项
        return !this.myChannels.find((myChannel) => {
          return myChannel.id === channel.id;
        });
        // 如果我的频道中不包括该频道，则收集到推荐频道中
       
      });
      
    },
  },
  watch: {},
  created() {
    this.loadAllChannels();
  },
  mounted() {},
  methods: {
    async loadAllChannels() {
      try {
        const { data } = await getAllChannels();

        this.allChannels = data.data.channels;
      } catch (err) {
        this.$toast("数据获取失败");
      }
    },
    onAddChannel(channel) {
      this.myChannels.push(channel);
    },
    onMyChannelClick(channel, index) {
      if (this.isEdit) {
        // 1. 如果是固定频道，则不删除
        if(this.flexChannels.includes(channel.id)){
            return
        }
        // 2. 删除频道项
         this.myChannels.splice(index,1)
        //    如果是编辑状态，执行删除频道
        if(index <= this.active){
            // 让激活频道的索引 -1
            this.$emit("updata-active",this.active -1,true)
        }
       
      } else {
        //     非编辑状态，执行切换频道
        this.$emit('updata-active',index,false)
      }
    },
  },
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
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
      }
      .active {
        color: #f85959;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
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

