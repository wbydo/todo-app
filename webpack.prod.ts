import { Configuration } from 'webpack';
import merge from 'webpack-merge';
import commonConfig from './webpack.common';

import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

const prodConfig: Configuration = merge(commonConfig, {
  mode: 'production',

  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },

  devtool: false,
});
export default prodConfig;
