const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ModernizrWebpackPlugin = require('modernizr-webpack-plugin')
const path = require('path');

const modernizrConfig = {
  filename: 'vendor/modernizr-bundle.js',
  'options': [
    'setClasses'
  ],
  'feature-detects': [
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
    "css/transitions",
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
}

//Get path so every environment works
const projectPath = path.resolve(__dirname);

//Define all the global config
const config = {
  entry: {
    final: projectPath + '/src/js/app.js'
  },
  output: {
    path: projectPath + '/www/assets/js/build/',
    filename: 'app.min.js'
  },
  plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
        output: {
          comments: false
        }
      }
    }),
    new ModernizrWebpackPlugin(modernizrConfig)
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js'],
    modules: [path.join(__dirname, '/node_modules')]
  }
};

module.exports = config;
