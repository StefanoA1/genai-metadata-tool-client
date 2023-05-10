/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const {NODE_ENV} = process.env;
const mode = NODE_ENV === 'development' ? 'development' : 'production';

const contenthash = '[local]-[contenthash:base64:5]';
// const PATH_PREFIX = mode === 'development' ? 'genai/' : '';
const PATH_PREFIX = '';

const getConfig = () => {
  return {
    API_YOUTUBE_KEY: process.env.API_YOUTUBE_KEY,
    API_BASE_URL: 'http://localhost:7004', // put your localhost api URL or prod URL here, when building the app in dev mode
    // MEDIA_API_URL: 'https://api-staging.coorpacademy.com/api-service/medias',
    APP_BASE_URL: process.env.NGROK_ID
      ? `https://${process.env.NGROK_ID}.ngrok.io` //https://${process.env.NGROK_ID}.ngrok.io/something, ex: teams
      : 'http://localhost:8080', // put your ngrok redirect URL here when building the app in dev mod (with https, like: 'https://NGROK_ID.ngrok.io/')
  };
};

const CONFIG = getConfig();

module.exports = {
  devServer: {
    historyApiFallback: true,
    static: path.join(__dirname, 'dist'),
    liveReload: true
  },
  entry: {
    index: './src/index.tsx'
  },
  target: 'web',
  mode,
  optimization: {
    // For testing purposes you can turn off minimize but be sure to comment minizer line and the Terser import.
    minimize: true,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: 'all'
    }
  },
  performance: {
    // Turn off size warnings for entry points
    hints: false
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.wasm', '.mjs', '.js', '.json', 'html'],
    alias: {
      '@coorpacademy/components/lib': '@coorpacademy/components/es'
    }
  },
  devtool: mode === 'development' ? 'eval-cheap-module-source-map' : 'nosources-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-react',
                [
                  '@babel/preset-env',
                  {
                    modules: false,
                    targets: {
                      browsers: ['last 2 versions']
                    }
                  }
                ]
              ],
              compact: true
            }
          }
        ]
      },
      {
        test: /\.ts(x?)$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              compilerOptions: {
                module: 'ESNext',
                sourceMap: true
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: contenthash
              }
            }
          },
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin(CONFIG),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      ignoreOrder: true
    }),
    new HtmlWebpackPlugin({
      filename: `${PATH_PREFIX}index.html`,
      template: './src/index.html',
      chunks: ['index']
    })
  ],
  output: {
    filename: '[name]-[contenthash].js',
    path: `${__dirname}/dist`
  }
};
