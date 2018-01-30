const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const commonConfig = {
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      vue: 'vue/dist/vue.js',
      '@': resolve('src')
    }
  },
  output: {
    path: resolve('dist/')
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules|vue\/dist/,
      loader: 'babel-loader'
    },
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          js: 'babel-loader!eslint-loader'
        }
      }
    },
    {
      test: /\.css$/,
      loader: 'style!less!css'
    }]
  },
  externals: {
    vue: 'vue'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin( {
      minimize : true,
      sourceMap : false,
      mangle: true,
      compress: {
        warnings: false
      }
    })
  ]
}
module.exports = [
  merge(commonConfig, {
    entry: resolve('src/index.js'),
    output: {
      filename: 'vue-h-zoom.min.js',
      libraryTarget: 'window',
      library: 'VueHZoom',
    }
  }),
  merge(commonConfig, {
    entry: resolve('src/libs/VueHZoom.vue'),
    output: {
      filename: 'vue-h-zoom.js',
      libraryTarget: 'umd',
      library: 'vue-h-zoom',
      umdNamedDefine: true
    }
  })
]
