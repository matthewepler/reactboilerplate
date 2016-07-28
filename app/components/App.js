import React from 'react';
import Ajax from 'simple-ajax';
import classNames from 'classnames';

// api
import { parseData } from './helpers/parseData.js';

// components
import Card from './Card.js';

// styles
import '../styles/base.scss';


class App extends React.Component {
	constructor() {
		super();
		this.state = { 
			dark: false,
			data: [],
			poll: true,
			connected: true,
		};
	}

	componentDidMount() {
		this.getData();

		setInterval(() => {
			if (this.state.poll) {
				this.getData();
			}
		},  this.props.pollInterval);
	}

	getData() {
		const ajax = new Ajax(
			{
				url: this.props.dataURL,
				method: 'GET',
				dataType: 'json',
				contentType: 'json'
			}
		);

		ajax.on('success', (event, data) => {
			// parseData returns array of objects organized by name: { owner: name, leads: [{}, {}, ...] }
			const result = parseData(event, data);
			this.setState({ 
				data: result,
				connected: true,
			});
		});

		var that = this;
		ajax.on('error', function(event, data) {
			console.log('ajax error', data);
			that.setState({ connected: false });
		});

		ajax.on('complete', function(event, data) {
			// console.log('ajax complete');
		});

		ajax.send();
	}

	skinClick() {
		this.setState({ dark: !this.state.dark });
		this.state.dark ? document.body.style.background = "white" : document.body.style.background = "#1B072E";
	}


	render() {
		const appClasses = classNames({
			'app-base' : true,
			'dark' : this.state.dark,
		});


		if (this.state.connected) {
			const cards = this.state.data.map( (d, index) => {
				return <Card ownerObj={d} key={index} rank={index} dark={this.state.dark}/>
			});
			
			return (
				<div className={appClasses}>
					{cards}
					<div className="skin-button" onClick={this.skinClick.bind(this)}><i className={this.state.dark ? "skin-button skin-button-dark fa fa-moon-o" : "skin-button skin-button-light fa fa-sun-o"} aria-hidden="true"></i></div>
				</div>
			)
		} else {
			return (
				<div className="app-loading">
					<i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
					<span className="sr-only">Loading...</span>
					<h1>Waiting for database connection...</h1>
				</div>
			)
		}
	}
}

export default App;