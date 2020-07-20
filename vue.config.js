module.exports = {
  publicPath: '/', // 公共路径
  outputDir: process.env.NODE_ENV === 'development' ? 'devdist' : 'dist', // 不同的环境打不同包名
  devServer: {
    port: 8888, // 端口号，如果端口号被占用，会自动提升1
    host: 'localhost', // 主机名， 127.0.0.1， 真机 0.0.0.0
    https: false, // 协议
    hotOnly: true,
    disableHostCheck: true,
    open: true // 启动服务时自动打开浏览器访问
  },
  configureWebpack: config => {
    // 调试JS
    config.devtool = 'source-map'
  },
  css: {
    // 查看CSS属于哪个css文件
    sourceMap: true
  },
  lintOnSave: true, // 关闭格式检查
  productionSourceMap: false, // 打包时不会生成 .map 文件，加快打包速度
  pluginOptions: {
    foo: {
      // 插件可以作为 `options.pluginOptions.foo` 访问这些选项。
    }
  }
}
