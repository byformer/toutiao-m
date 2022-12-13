module.exports = {
    plugins: {
    /*   'autoprefixer': {
        browsers: ['Android >= 4.0', 'iOS >= 8']
      },       vue脚手架已经做了这件事 */ 
      'postcss-pxtorem': {
        rootValue ({ file }) {
            return file.indexOf('vant') !== -1 ? 37.5 : 75
          },      // 设计稿 750px 750/10  = 75
        propList: ['*']  // 表示所有属性都转
        //注意： 这个插件转换不了内连样式
      }
    }
  }