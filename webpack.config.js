const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        app: "./dev/app/app.module.js",
    },
    output: {
        filename: "./public/app/[name].js"
    },
    module: {
		    rules: [
				{
					test: /\.scss$/, use: ExtractTextPlugin.extract(
					{
						use: [{
							loader: "css-loader"
						}, {
							loader: "sass-loader"
						}],
						fallback: "style-loader"
						
					})
				}
				]
    },
	plugins:[new ExtractTextPlugin('./public/css/app.css')],
    resolve: {
        extensions: [".js"]
    }
}