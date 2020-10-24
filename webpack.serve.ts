import { Configuration } from 'webpack';
import merge from 'webpack-merge';
import commonConfig from './webpack.common';

const devConfig: Configuration = merge(commonConfig, {
  mode: 'development',

  devServer: {
    inline: true,
    contentBase: 'dist',
  },

  devtool: 'source-map',

  plugins: [],
});

export default devConfig;
