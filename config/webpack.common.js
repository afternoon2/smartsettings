const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');

module.exports = {
  entry: path.resolve(__dirname, '../src/ts/index.ts'),
  output: {
    filename: 'index.js',
    globalObject: 'typeof self !== \'undefined\' ? self : this',
    library: 'SmartSettings',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.ts', '.sass'],
    plugins: [
      new TsconfigPathsPlugin(),
    ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        options: {
          configFileName: './tsconfig.json'
        }
      },
      {
        test: /\.sass$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          }, {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[sha1:hash:hex:4]',
              },
              importLoaders: 1
            },
          }, {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.resolve(__dirname, 'postcss.config.js')
              }
            }
          }, {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: 'compressed'
              },
            },
          }
        ],
      },
    ],
  },
  plugins: [
    new CheckerPlugin(),
  ]
};
