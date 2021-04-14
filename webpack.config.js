//config
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader",]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.png$/,
        use: ["url-loader?mimetype=image/png",]
      },
      {
        test: /\.scss$/,
        use: ["style-loader","css-loader","sass-loader",],
      },
      {
        test: /\.(ttf|woff|eot|svg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: ["file-loader"]
      },
    ],
  },
};
