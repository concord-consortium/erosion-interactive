'use strict';

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const os = require('os');

module.exports = (env, argv) => {
  const devMode = argv.mode !== 'production';

  return {
    context: __dirname, // to automatically find tsconfig.json
    devServer: {
      static: 'dist',
      hot: true,
      server: {
        type: 'https',
        options: {
          cert: path.resolve(os.homedir(), '.localhost-ssl/localhost.crt'),
          key: path.resolve(os.homedir(), '.localhost-ssl/localhost.key'),
        }
      }
    },
    devtool: devMode ? 'eval-cheap-module-source-map' : 'source-map',
    entry: {
      "3dview": './src/3d-view/index.tsx',
      "data-table": "./src/data-table/index.tsx",
      "ipad": "./src/ipad/index.tsx"
    },
    mode: 'development',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'assets/[name].[contenthash].js',
    },
    performance: { hints: false },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
        },
        // This code coverage instrumentation should only be added when needed. It makes
        // the code larger and slower
        process.env.CODE_COVERAGE ? {
          test: /\.[tj]sx?$/,
          loader: '@jsdevtools/coverage-istanbul-loader',
          options: { esModules: true },
          enforce: 'post',
          exclude: path.join(__dirname, 'node_modules'),
        } : {},
        {
          test: /\.(sa|sc|le|c)ss$/i,
          use: [
            devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                esModule: false,
                modules: {
                  // required for :import from scss files
                  // cf. https://github.com/webpack-contrib/css-loader#separating-interoperable-css-only-and-css-module-features
                  mode: 'icss',
                }
              }
            },
            'postcss-loader',
            'sass-loader',
          ]
        },
        {
          test: /\.(png|woff|woff2|eot|ttf)$/,
          type: 'asset',
        },
        { // disable svgo optimization for files ending in .nosvgo.svg
          test: /\.nosvgo\.svg$/i,
          loader: '@svgr/webpack',
          options: {
            svgo: false,
          }
        },
        {
          test: /\.glb/,
          type: 'asset/resource'
        },
        {
          test: /\.gltf/,
          type: 'asset/resource'
        },
        {
          test: /\.svg$/i,
          exclude: /\.nosvgo\.svg$/i,
          oneOf: [
            {
              // Do not apply SVGR import in CSS files.
              issuer: /\.(css|scss|less)$/,
              type: 'asset',
            },
            {
              issuer: /\.tsx?$/,
              loader: '@svgr/webpack',
              options: {
                svgoConfig: {
                  plugins: [
                    {
                      // cf. https://github.com/svg/svgo/releases/tag/v2.4.0
                      name: 'preset-default',
                      params: {
                        overrides: {
                          // don't minify "id"s (i.e. turn randomly-generated unique ids into "a", "b", ...)
                          // https://github.com/svg/svgo/blob/master/plugins/cleanupIDs.js
                          cleanupIDs: { minify: false },
                          // leave <line>s, <rect>s and <circle>s alone
                          // https://github.com/svg/svgo/blob/master/plugins/convertShapeToPath.js
                          convertShapeToPath: false,
                          // leave "class"es and "id"s alone
                          // https://github.com/svg/svgo/blob/master/plugins/prefixIds.js
                          prefixIds: false,
                          // leave "stroke"s and "fill"s alone
                          // https://github.com/svg/svgo/blob/master/plugins/removeUnknownsAndDefaults.js
                          removeUnknownsAndDefaults: { defaultAttrs: false },
                        }
                      }
                    }
                  ]
                }
              }
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: [ '.ts', '.tsx', '.js' ],
    },
    stats: {
      // suppress "export not found" warnings about re-exported types
      warningsFilter: /export .* was not found in/,
    },
    plugins: [
      new ESLintPlugin({
        extensions: ['ts', 'tsx', 'js', 'jsx'],
      }),
      new MiniCssExtractPlugin({
        filename: devMode ? 'assets/[name].css' : 'assets/[name].[contenthash].css',
      }),
      new HtmlWebpackPlugin({
        filename: '3dview-index.html',
        chunks: ['3dview'],
        template: 'src/3d-view/index.html',
        favicon: 'src/public/favicon.ico',
      }),
      new HtmlWebpackPlugin({
        filename: 'data-table-index.html',
        chunks: ['data-table'],
        template: 'src/3d-view/index.html',
        favicon: 'src/public/favicon.ico',
      }),
      new HtmlWebpackPlugin({
        filename: 'ipad-index.html',
        chunks: ['ipad'],
        template: 'src/ipad/index.html',
        favicon: 'src/public/favicon.ico',
      }),
      new CleanWebpackPlugin(),
    ]
  };
};
