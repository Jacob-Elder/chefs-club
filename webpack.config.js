const path = require('path')
const webpack = require("webpack")
const HtmlWebPackPlugin = require("html-webpack-plugin");

const config = (env, argv) => {
  console.log("argv.mode = ", argv.mode)
  //define global variables based on environment (development/production)
  const backend_url = argv.mode === "production"
    ? "http://localhost:4000"
    : "http://localhost:4000"

  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'main.js'
    },
    devServer: {
      static: path.resolve(__dirname, 'build'),
      compress: true,
      historyApiFallback: true,
      port: 3000
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.png$/,
          type: 'asset/resource'
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        BACKEND_URL: JSON.stringify(backend_url)
      })
    ]
  }
}

module.exports = config