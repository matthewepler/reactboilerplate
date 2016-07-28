import React from 'react';
import Ajax from 'simple-ajax';
import { parseData } from './helpers/parseData.js';

// components
import Card from './Card.js';

// styles
import '../styles/base.scss';


class App extends React.Component {
	constructor() {
		super();
		this.state = { 
			poll: true,
			data: [],
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
			this.setState({ data: result });
		});

		ajax.on('error', function(event, data) {
			console.log('ajax error', data);
		});

		ajax.on('complete', function(event, data) {
			// console.log('ajax complete');
		});

		ajax.send();
	}


	render() {
		const cards = this.state.data.map( (d, index) => {
			return <Card ownerObj={d} key={index} rank={index}/>
		});
		
		return (
			<div className="app-container">
				{cards}
			</div>
		)
	}
}

export default App;