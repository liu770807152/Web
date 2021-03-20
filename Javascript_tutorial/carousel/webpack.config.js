const uglify = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const path = require('path'),
      HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: path.resolve(__dirname, './src/js/index.js')
  },
  output: {
    path: path.resolve(__dirname, '/dist'),
    filename: 'js/bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname + 'node_modules'),
        include: path.resolve(__dirname + 'src'),
        options: {
          'presets': ['latest']
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
          {
            loader: 'style-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function() {
                return [autoprefixer('last 5 versions')]
              }
            }
          },
          'sass-loader',
        ]
      },
      {
        test: /\.(png|jpg|jepg|gif|ico)$/i,
        // loaders: [
        //   'url-loader?limit=1024&name=img/[name]-[hash:16].[ext]',
        //   'image-webpack-loader'
        // ]
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      }
    ]
  },
  plugins: [
    new uglify(),
    new HtmlWebpackPlugin({
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html'),
      title: 'carousel',
      chunksSortMode: 'manual',
      excludeChunks: ['node_modules'],
      chunks: ['index'],
      hash: true,
      files: {
        js: ['js/index.js'],
        chunks: {
          'main': {
            'entry': 'dist/bundle.js'
          }
        }
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  devServer: {
    watchOptions: {
      ignored: /node_modules/,
    },
    host: 'localhost',
    port: 3000
  }
}
