import { Configuration } from 'webpack';
import path from 'path';

/**
 * CleanWebpackPlugin
 *   コンパイル時に生成物の出力ディレクトリのファイルを削除するプラグイン
 *   ファイル構成によって、前回のコンパイル結果が残ったりすることを防ぐ役割
 *   本体に型定義が入っているので普通に読み込む
 *   プレイヤー完成時には不要な可能性有り
 */
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

/**
 * HtmlWebpackPlugin
 *   コンパイル時にhtmlファイルを一緒に出力するプラグイン
 *
 *   importするには本体と別に型定義のインストールが必要
 *   プレイヤー完成時には不要なはず
 *   今回は型定義をインストールせず、eslint-disableとrequireで雑に読み込んでおく
 */
/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlWebpackPlugin = require('html-webpack-plugin');
/* eslint-enable @typescript-eslint/no-var-requires */

/**
 * MiniCssExtractPlugin
 *   コンパイル時にcssファイルを一緒に出力するプラグイン
 *
 *   importするには本体と別に型定義のインストールが必要
 *   プレイヤー完成時には不要なはず
 *   今回は型定義をインストールせず、eslint-disableとrequireで雑に読み込んでおく
 */
/* eslint-disable @typescript-eslint/no-var-requires */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
/* eslint-enable @typescript-eslint/no-var-requires */

const commonConfig: Configuration = {
  entry: path.join(__dirname, 'src', 'index'),

  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
  ],

  module: {
    rules: [
      // {
      //   test: /\.jsx?$/,
      //   use: 'babel-loader',
      //   exclude: [/core-js/, /node_modules/],
      // },
      {
        test: /\.tsx?$/,
        use: [
          // 'babel-loader',
          'ts-loader',
          'eslint-loader',
        ],
        exclude: [/core-js/, /node_modules/],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.png|svg|gif|jpg$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              /**
               * ファイルとして書き出すか、JSの中に埋め込むかの閾値。
               * サイズがこの数値以上の場合、ファイルとして書き出す。
               *
               * 参考:
               *   https://webpack.js.org/loaders/url-loader/#limit
               *
               * 要調整
               */
              limit: 102400,

              /**
               * ファイルとして書き出す場合のファイル名の設定
               * デフォルトは'[contenthash].[ext]'
               * https://github.com/webpack-contrib/file-loader#name
               *
               * TODO:
               *   ローカル環境、開発環境、本番環境での設定値の検討
               *
               * このパラメータは
               * url-loaderのlimitを超えた場合にfile-loaderに渡される
               *   > The fallback loader will receive the same configuration options as url-loader.
               *   https://github.com/webpack-contrib/url-loader
               */
              name: '[path][name].[ext]',
            },
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
};
export default commonConfig;
