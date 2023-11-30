const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  mode: "production",

  module: {
    noParse: [/gun\.js$/, /sea\.js$/],
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          ignore: ["src/**/*.test.ts"],
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    fallback: {
      crypto: false,
      stream: false,
      path: false,
      fs: false
    },
  },
  performance: {
    hints: false,
  },
  output: {
    path: path.resolve(__dirname, "./dist/bundle"),
    // The filename needs to match the index.web.d.ts declarations file.
    filename: "s5plus-browserTools.js",
    library: {
      name: 'browserTools',
      type: 'umd',
    },
    globalObject: 'this',
  },
};
