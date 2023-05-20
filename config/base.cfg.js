const path = require('path');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const pagesToRender = require('./pages-to-render');
const pagesDir = path.join(__dirname, '../src/pages');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const getPages = () => {
  let pages = fs.readdirSync(pagesDir);

  if (pagesToRender.pages && pagesToRender.pages.length) {
    pages = pagesToRender.pages
  };

  if (pagesToRender.exclude && pagesToRender.exclude.length) {
    return pages.filter((page) => !pagesToRender.exclude.includes(page));
  }

  return pages;
}

const generatedPages = getPages().map(pageName => {
  return new HtmlWebpackPlugin({
    filename: `${pageName}.html`,
    template: path.join(pagesDir, `${pageName}/${pageName}.pug`),
    inject: true,
    cache: false,
    minify: {
      removeComments: true,
      collapseWhitespace: true
    }
  })
});

module.exports = {
  entry: {
    bundle: path.join(__dirname, '../src/app.js')
  },

  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'js/[name].[contenthash:7].js',
    publicPath: '/'
  },

  module: {
    rules: [{
        test: /\.pug$/,
        use: {
          loader: 'pug-loader',
        }
      },

      {
        test: /\.(png|jpe?g|gif|ico|webp)$/,
        use: [{
          loader: 'url-loader',
          options: {
            name: 'assets/images/[name].[contenthash:7].[ext]',
            limit: 8192
          }
        }]
      },
      {
        test: /\.svg$/,
        exclude: [
          path.resolve(__dirname, '../src/assets/fonts')
        ],
        oneOf: [{
            loader: 'svg-url-loader',
            resourceQuery: /inline/,
            options: {
              name: 'assets/images/[name].[contenthash:7].[ext]',
            }
          },
          {
            loader: 'svg-sprite-loader',
            resourceQuery: /sprite/,
            options: {
              symbolId: filePath => path.basename(filePath, '.svg'),
              spriteFilename: 'assets/images/sprite.[contenthash:7].svg',
            }
          },
          {
            loader: 'file-loader',
            resourceQuery: /image/,
            options: {
              symbolId: filePath => path.basename(filePath, '.svg'),
              name: 'assets/images/[name].[contenthash:7].[ext]',
            }
          }
        ]
      },

      {
        test: /\.(mp4|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        include: path.resolve(__dirname, '../src/assets/media'),
        use: [{
          loader: 'file-loader',
          options: {
            name: 'assets/media/[name].[contenthash:7].[ext]',
          }
        }]
      },
      {
        test: /\.(eot|otf|svg|ttf|woff|woff2)$/,
        include: path.resolve(__dirname, '../src/assets/fonts'),
        use: [
          {
            loader: 'file-loader',
            options: {
              context: path.resolve(__dirname, '../src/assets/fonts'),
              name: 'assets/fonts/[path][name].[ext]'
            }
          }
        ]
      },
    ]
  },
  plugins: [
    ...generatedPages,
    new SpriteLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:7].css',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../src/assets/favicons'),
          to: path.resolve(__dirname, '../dist/assets/favicons')
        }
      ]
    })

  ],
  resolve: {
    alias: {
      '~node-modules': path.resolve(__dirname, '../node_modules'),
      '~dev-tools': path.resolve(__dirname, '../dev-tools'),
      '~src': path.resolve(__dirname, '../src'),
      '~pages': path.resolve(__dirname, '../src/pages'),
      '~blocks': path.resolve(__dirname, '../src/blocks'),
      '~scss': path.resolve(__dirname, '../src/common/scss'),
      '~pug': path.resolve(__dirname, '../src/common/pug'),
      '~js': path.resolve(__dirname, '../src/common/js'),
      '~css': path.resolve(__dirname, '../src/common/css'),
      '~images': path.resolve(__dirname, '../src/assets/images'),
      '~assets': path.resolve(__dirname, '../src/assets'),
    }
  },
};