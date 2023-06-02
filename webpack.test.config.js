const dotEnv = require('dotenv').config();
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = function (env, argv) {
  const processEnv = {
    TWILIO_ACCOUNT_SID: dotEnv.TWILIO_ACCOUNT_SID,
    TWILIO_FLEX_FLOW_SID: dotEnv.TWILIO_FLEX_FLOW_SID,
    AWS_ENDPOINT: dotEnv.AWS_ENDPOINT,
    NODE_ENV: JSON.stringify('production')
  };

  return {
    entry: './src/index.js',
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          loader: 'file-loader',
          options: {
              name: '[name][hash].[ext]',
              outputPath: 'images',
              esModule: false,
          },
      },
      ]
    },
    resolve: {
      extensions: ['*', '.js', '.jsx']
    },
    performance: {
      maxEntrypointSize: 1000000,
      maxAssetSize: 1000000
    },
    optimization: {
      minimize: true,
      mergeDuplicateChunks: true
    },
    output: {
      filename: 'nm-webchat-widget.min.js',
      path: path.resolve(__dirname, 'dist'),
      library: 'SampleWebchat',
      libraryExport: 'default',
      libraryTarget: 'window'
    },
    plugins: [
      new BundleAnalyzerPlugin(),
      new CleanWebpackPlugin(),
      new webpack.DefinePlugin({ 'process.env': JSON.stringify(processEnv) })
    ]
  };
};
