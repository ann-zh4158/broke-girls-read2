// const path = require('path');
// const HtmlWebPackPlugin = require('html-webpack-plugin');
// const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
import path from 'path';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    mode: process.env.NODE_ENV,
    // entry: './client/index.js', 
    entry: './server/server.ts',
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    devServer: {
        host: 'localhost',
        port: 8080,
        // enable HMR on the devServer
        hot: true,
        // fallback to root for other urls
        historyApiFallback: true,
        static: {
            directory: path.resolve(__dirname, '/build'),
            publicPath: '/build',
        },
        proxy: {
          '/api': 'http://localhost:3000'
        },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env',{ targets: "defaults" }], 
                  ['@babel/preset-react',{ targets: "defaults" }]
                ]
              }
            }
        },
        {
          test: /.(css|scss)$/,
          exclude: /node_modules/,
          use: ['style-loader', 'css-loader','sass-loader'],
        },
        {
            test: /\.(ts|tsx)$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        },
      ],
    },
    resolve: {
       // Enable importing JS / JSX files without specifying their extension
        extensions: [ '.tsx', '.ts', '.jsx', '.js' ],
        fallback: {
            "fs": false,
            "net": false
        },
    },
    plugins: [
        new HtmlWebPackPlugin({
          template: 'index.html',
        }),
        new NodePolyfillPlugin()
      ],
};