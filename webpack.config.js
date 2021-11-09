const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { execSync } = require("child_process")
const path = require("path")
const fs = require("fs")

// Read all .vue files in ./src directory and turn them
// into entry points for webpack.
var entries = {}
fs.readdirSync("./src").forEach(file => {
  if (file.endsWith(".vue")) {
    var base = path.basename(file, ".vue");
    entries[base] = "./" + path.join("src", base + ".js");
  }
});

var htmlWebpackPlugins = Object.keys(entries).map((entry) => {
  return new HtmlWebpackPlugin({
    title: `Twitch [${entry}]`,
    template: "./src/twitch.html",
    filename: `${entry}.html`,
    minify: false,
    hash: true,
    chunks: ["vendor", entry]
  })
})

module.exports = {
  optimization: {
    minimize: false,
    splitChunks: { name: 'vendor', chunks: 'all' },
  },
  entry: entries,
  output: {
    path: path.resolve(__dirname, "./dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader', 'postcss-loader']
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
    ...htmlWebpackPlugins
  ],
  performance: {
    // Twitch forbids minification. Disable file size performance checks.
    maxEntrypointSize: 99999999,
    maxAssetSize: 99999999,
  },
  devtool: false,
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    host: '0.0.0.0',
    port: 8080,
    https: {
      key: fs.readFileSync('localhost-key.pem'),
      cert: fs.readFileSync('localhost.pem'),
      ca: fs.readFileSync(execSync("mkcert -CAROOT").toString().trim() + '/rootCA.pem'),
    },
  },
}