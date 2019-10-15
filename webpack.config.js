const path = require('path')
// const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin') // 通过 npm 安装
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  entry: {
    main: './src/index.js',
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'Axios',
    libraryTarget: 'umd'
  },
  plugins: [
    // new CleanWebpackPlugin({
    //   cleanAfterEveryBuildPatterns: ['dist']
    // }),
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
  ],
}
