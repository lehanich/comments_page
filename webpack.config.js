const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
 // Our PostCSSLoader
//  const autoprefixer = require('autoprefixer')
//  const PostCSSLoader = {
//     loader: 'postcss-loader',
//     options: {
//       ident: 'postcss',
//       sourceMap: false, // turned off as causes delay
//       plugins: () => [
//         autoprefixer({
//          browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9']
//         })
//       ]
//     }
//  }
// Standard style loader (prod and dev covered here)

module.exports = {
  entry: './src/main.tsx',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index_bundle.js',
    publicPath: '/',
    clean: true
  },
  devtool: false, // 'source-map',
  cache: {
    type: "memory" // "filesystem"
  },
  devServer: {
    client: {
      overlay: true
    },
    historyApiFallback: true,
    compress: true,
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
   }
   //  headers: {
   //    "Access-Control-Allow-Origin": "*",
   //    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
   //    "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
   //  }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'react'],
          cacheDirectory: true
        }
      },
      {
        test: /\.(ts|tsx)?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.module\.s(a|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              esModule: true,
              modules: true,
              sourceMap: false, // turned off as causes delay
                  // localIdentName: '[name]_[local]_[hash:base64:5]',
                  // importLoaders: 2,
                  // camelCase:true,
                  // modules: {
                  //             mode: "local",
                  //             auto: true,
                  //             exportGlobals: true,
                  //             localIdentName: "[path][name]__[local]--[hash:base64:5]",
                  //             localIdentContext: path.resolve(__dirname, "src"),
                  //             localIdentHashSalt: "my-custom-hash",
                  //             namedExport: true,
                  //             exportLocalsConvention: "camelCaseOnly",
                  //             exportOnlyLocals: false,
                  //           },
              
            }
          }, 
          "sass-loader"
        ]
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        // loader: "sass-loader",
        use: [ 
          MiniCssExtractPlugin.loader,
          {
              loader: 'css-loader',
              options: {
              modules: "global",
              importLoaders: 2,
              // camelCase: true,
              sourceMap: false, // turned off as causes delay
            }
          },
          "sass-loader"
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
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
          filename: "vendor.[contenthash].js",
        },
        'react': {
          test: /[/\\]node_modules[/\\]react/,
          filename: "react-with-dom.[contenthash].js",
            priority: 10,
        },
      }
    }
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css'
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: 'sourcemaps/[file].map[query]',
      publicPath: 'file:///Users/aleksey/front_sourcemaps/comments_page',
      // exclude: ['vendor.js'],
    })
  ]
}
