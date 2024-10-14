const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  entry: './src/main.tsx',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index_bundle.js',
    publicPath: '/',
    clean: true
  },
  devtool: 'eval',
  cache: {
    type: "filesystem" // "memory" // 
  },
  devServer: {
    static: "vendor",
    client: {
      overlay: true
    },
    historyApiFallback: true,
    compress: true,
    // inline: true,
    port: 8001,
    proxy: {
      '/api': {
        target: {
          host: "10.141.0.12",
          protocol: 'http:',
          port: 9000
        },
        pathRewrite: {
          '^/api-public': '/public-api/v1',
          '^/api-private': '/private-api/v1'
        }
      }
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
   },
   module: {
      rules: [
        {
          test: /\.(js|jsx)?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  "targets": "defaults"
                }
              ],
              '@babel/preset-react'
            ], // [{ targets: "defaults" }, 'react'],
            "env": {
              "development": {
                "presets": [["@babel/preset-react", { "development": true }]]
              }
            },
            cacheDirectory: true,
            plugins: [
              "@babel/plugin-transform-async-generator-functions",
              "@babel/plugin-transform-async-to-generator"
            ]
          },
        },
        {
          test: /\.(ts|tsx)?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.module\.s(a|c)ss$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                esModule: true,
                // modules: true,
                modules: {
                  localIdentName: '[name]_[local]_[hash:base64:5]',
                  // exportGlobals: true,
                  exportLocalsConvention: 'camelCase'
                },
                sourceMap: false, // turned off as causes delay
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: false,
                api: "modern",
              }
            }
          ]
        },
        {
          test: /\.s(a|c)ss$/,
          exclude: /\.module.(s(a|c)ss)$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
              modules: "global",
              importLoaders: 2,
              sourceMap: false, // turned off as causes delay
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: false,
                api: "modern"
              }
            }
          ],
        },
        {
				  test: /\.(png|jpe?g|gif)$/i,
				  type: 'asset',
				  generator: {
            filename: 'images/[name][ext]'
          },
          parser: {
            dataUrlCondition: {
              maxSize: 50 * 1024 // 4kb
            }
          }
			},
			{
				test: /\.(svg)$/i,
				type: 'asset/inline'
			},
			{
				test: /\.(svg)$/i,
				resourceQuery: /inline/,
				type: 'asset/inline'
			},
      ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.scss'],
    plugins: [new TsconfigPathsPlugin({/* options: see below */})]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: './src/index.dev.html'
    }),
    new webpack.DllReferencePlugin({
      manifest: require("./vendor/main-manifest.json"),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
  ]
}
