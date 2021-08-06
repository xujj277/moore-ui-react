const base = require('./webpack.config.js')

module.exports = Object.assign({}, base, {
  mode: 'production',
  externals: { // 外部依赖
    react: {
      commonjs: 'react', // module.export
      commonjs2: 'react',
      amd: 'react',
      root: 'React', // script
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
      root: 'ReactDom',
    },
  }
})