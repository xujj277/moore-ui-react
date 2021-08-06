const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'production',
  entry: {
    index: './lib/index.tsx'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, 'dist/lib'),
    library: 'Moore-UI-React',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Moore",
      template: 'index.html',
    })
  ],
  externals: { // 外部依赖
    react: {
      commonjs: 'react', // module.export
      commonjs2: 'react',
      amd: 'react',
      root: 'React' // script
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
      root: 'ReactDom'
    }
  }
}