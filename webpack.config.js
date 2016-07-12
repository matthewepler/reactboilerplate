module.exports = {
	context: __dirname,
	entry: './main.js',
	output: {
		path: './',
		filename: 'bundle.js',
	},
	devServer: {
		inline: true,  // hot reloading without webpack status bar
		port: 1111,    // channge to whatever
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
			}
		]
	},
	postcss: function () {
        return [precss, autoprefixer];
    }
}