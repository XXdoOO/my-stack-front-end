const { defineConfig } = require('@vue/cli-service')
const path = require("path");
module.exports = defineConfig({
  devServer: {
    port: 5000
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, 'src/assets/css/common.less')
      ]
    }
  }
})
