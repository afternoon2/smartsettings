const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');

module.exports = {
  entry: path.resolve(__dirname, '../src/ts/index.ts'),
  output: {
    filename: 'index.js',
    globalObject: 'typeof self !== \'undefined\' ? self : this',
    library: {
      amd: 'SmartSettings',
      commonjs: 'Smart',
      root: 'SmartSettingsettings',
    },
    libraryExport: 'default',
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
        include: [path.resolve(__dirname, '../src/index.sass')],
        exclude: /node_modules/,
        use: [
          {
            loader: 'css-loader',
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
              }
            },
          }
        ]
      }
    ],
  },
  plugins: [
    new CheckerPlugin(),
  ]
};
