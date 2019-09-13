const path = require('path');

module.exports = {
  entry: './src/timer.js',
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'production',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
};
