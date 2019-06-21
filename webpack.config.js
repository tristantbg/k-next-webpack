const stylusLoder = require("stylus-loader");
const nib = require("nib");
const rupture = require("rupture");
const webpack = require("webpack");
const jeet = require("jeet");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ModernizrWebpackPlugin = require("modernizr-webpack-plugin");
const SvgStore = require("webpack-svgstore-plugin");

const modernizrConfig = {
  filename: "vendor/modernizr-bundle.js",
  options: ["setClasses"],
  "feature-detects": [
    // "emoji",
    // "history",
    "touchevents",
    // "video",
    // "webgl",
    "css/animations",
    // "css/backgroundblendmode",
    // "css/columns",
    // "css/filters",
    "css/flexbox",
    // "css/hyphens",
    // "css/mask",
    "css/positionsticky",
    // "css/scrollbars",
    "css/transforms",
    "css/transforms3d",
    "css/transitions"
    // "css/vhunit",
    // "css/vwunit",
    // "img/srcset",
    // "img/webp",
    // "storage/localstorage",
    // "storage/sessionstorage"
  ],
  minify: {
    output: {
      comments: false,
      beautify: false
    }
  }
};

const extract = new MiniCssExtractPlugin({
  filename: "index.css",
  chunkFilename: "index.chunk.css"
});

module.exports = {
  devServer: {
    compress: true,
    public: "localhost:8080"
  },
  plugins: [
    extract,
    new webpack.LoaderOptionsPlugin({
      test: /\.styl$/,
      stylus: {
        default: {
          use: [jeet(), rupture(), nib()],
          import: ["~nib/lib/nib/index.styl"]
        }
      }
    }),
    new SvgStore({
      svgoOptions: {
        plugins: [{ removeTitle: true }]
      },
      prefix: ""
    }),
    new ModernizrWebpackPlugin(modernizrConfig)
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.styl(us)?$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "stylus-loader"]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: { loader: "url-loader" }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: ["url-loader?limit=10000", "img-loader"]
      }
    ]
  },
  entry: ["webpack-dev-server/client?http://localhost:8080/", "./index.js"],
  output: {
    path: path.resolve(__dirname, "www/assets/build"),
    publicPath: "/assets/",
    filename: "bundle.js"
  },
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          output: {
            comments: false
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
};
