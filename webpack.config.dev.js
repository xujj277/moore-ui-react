const base = require('./webpack.config.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = Object.assign({}, base, {
  mode: 'development',
  entry: {
    example: './example.tsx',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Moore",
      template: 'example.html',
    })
  ],
})