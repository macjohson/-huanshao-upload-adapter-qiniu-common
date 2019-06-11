const path = require('path');

module.exports = {
    mode: "production",
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:"uploadAdapter.js",
        library:"uploadAdapterQiniu",
        libraryTarget: 'umd',
        libraryExport:"default"
    },
	module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader'
            }
          }
        ]
      }
};
