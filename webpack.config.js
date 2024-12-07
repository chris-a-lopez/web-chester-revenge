const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.ts',  // Entry point for the app
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),  // Change output folder to 'build'
  },
  resolve: {
    extensions: ['.ts', '.js'],  // Resolve both TypeScript and JS files
  },
  module: {
    rules: [
      {
        test: /\.ts$/,  // Handle TypeScript files
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/,  // Optional: handle CSS files
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './dist/index.html',  // Make sure the template is in the 'src' folder
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'build'),  // Serve static files from the 'build' folder
    },
    compress: true,
    port: 9000,
    hot: true,  // Enable Hot Module Replacement
    open: true, // Open the browser automatically
  },
};
