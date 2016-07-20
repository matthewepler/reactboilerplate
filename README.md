# TO-DO
* clickable panels - 1 moves to top, other hidden
	* row expands - use Bootstrap. 
* alert

# REACT APP SETUP

How to start a project from scratch, plan the development, and set up your developer environment.

## Recommended workflow - high level 
* Start with mockup
* Break the UI into component hierarchy
* Build a static version in React using a JSON API
* ID minimal but complete model of UI state and where it should go
* Add inverse data flow (back up the chain to db)

## Webpack setup
* `npm init` in new dir.
* `npm install react react-dom --save`
* `npm install babel-core babel-loader babel-preset-es2015 babel-preset-react babel-preset-stage-0 webpack webpack-dev-server css-loader style-loader sass-loader node-sass jshint-loader  precss autoprefixer postcss-loader url-loader --save-dev`
* `touch index.html main.js App.js webpack.config.js .babelrc`
* add a `<div>` anchor point for the app in index.html
* add a `<script>` tag that links to index.js (to be created by webpack) in index.html
* setup webpack.config.js (see below)
* setup .babelrc file (see below)
* create basic React component in App.js (see below)
* render App component into DOM in main.js (see below)
* in package.json, add a script to start the webpack server:
```JSON
{
	"name" : ...
	"version" : ...
	...
	"scripts" : {
		"start" : "webpack-dev-server"	
	} 
}
```
* `npm run start`

## Recommended Resources
"WebPack Fundamentals" course on Pluralsight (see Shane for login)
[Basic React/Webpack setup](https://www.youtube.com/watch?v=HXOoe1VSKpo)
[Webpack tutorial](https://www.youtube.com/watch?annotation_id=annotation_4139363737&feature=iv&src_vid=MhkGQAoc7bc&v=9kJVYpOqcVU)

## Document Boilerplates
### index.html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>whatevs</title>
</head>
<body>
	<div id="app"></div>
	<script src="index.js"></script>
</body>
</html>

### webpack.config.js
```javascript
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
			},
			{ 
				test: /\.(png|woff|woff2|eot|ttf|svg)$/, 
				loader: 'url-loader?limit=100000' 
			}
		]
	},
	postcss: function () {
        return [precss, autoprefixer];
    }
}
```

### .babelrc
```json
{
	"presets" : ["es2015", "react", "stage-0"]
}
```

### App.js
```jsx
import React from 'react'

class App extends React.Component {
	render() {
		return <h1>React component with hot reload.</h1>
	}
}

export default App;
```

### main.js
```jsx
import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

const root = document.getElementById('app');
ReactDOM.render(<App/>, root)
```