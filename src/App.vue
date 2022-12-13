<template>
  <div id="app">
    <h1>黑马头条</h1>
<van-button type="primary">主要按钮</van-button>
<van-button type="info">信息按钮</van-button>
<van-button type="default">默认按钮</van-button>
<van-button type="warning">警告按钮</van-button>
<van-button type="danger">危险按钮</van-button>
<i class="iconfont icon-zuopin"></i>
  <div class="mydiv"></div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped lang="less">
 .mydiv{
  width:200px;
  height:400px;background-color: yellow;
 }
</style>