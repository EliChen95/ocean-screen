const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
  ? '/ocean-screen/'  // 替换成你的 GitHub 仓库名
  : '/'
})
