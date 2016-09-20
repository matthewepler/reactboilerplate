const Dotenv = require('dotenv-webpack');

module.exports = {
	context: __dirname,
	entry: './app/main.js',
	output: {
		path: __dirname + '/build',
		filename: 'bundle.js',
		publicPath: 'build',
	},
	devServer: {
		inline: true,  // hot reloading without webpack status bar
		port: 8888,    // channge to whatever
	},
	devtool: 'source-map',
	module: {
		loaders: [ 
			{
				test: /\.js$/,
				exlude: /node_modules/,
				loader: 'babel',
			},
			{
				test: /\.css$/, // for any third-party stylesheets
				exclude: /node_modules/,
				loader: ["style", "css", "postcss"]
			},
			{
				test: /\.scss$/, // for my scss sheets. imported in App.js
				exclude: /node_modules/,
				loaders: ["style", "css", "sass"]
			},
			{ 
				test: /\.(png|woff|woff2|eot|ttf|svg)$/, 
				loader: 'url-loader?limit=100000' 
			},
			{ 
				test: /\.json$/, 
				loader: 'json-loader' 
			}
		]
	},
	node: {
	    console: true,
	    fs: 'empty',
	    net: 'empty',
	    tls: 'empty'
  	},
	postcss: function () {
        return [precss, autoprefixer];
    },
    plugins: [
	    new Dotenv({
	      path: './.env', // can be ommitted as this is the default 
	      safe: false, // make true to use dotenv-safe and require variables 
	      sample: './.env.example', // if safe=true, use this to define the safe env 
	      systemvars: false // if true, also loads system env variables 
	    })
  	]
}