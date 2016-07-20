import React from 'react';
import _ from 'underscore'
import Ajax from 'simple-ajax';
import FlipMove from 'react-flip-move';

// components
import Row from './Row.js';;

// static dummy data
// import { leads } from '../api/leads.js'


// stylesheets
import '../styles/base.scss';

class App extends React.Component {

	constructor() {
		super();
		this.state = { 
			poll: true,
			data: [],
		};
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
			// console.log('ajax success', data);
			// ** sort all incoming data by person here

			data.map((d) => { 
				d.stack = true; 
				d.visible = true;
			});
			this.setState({ data: data });
		});

		ajax.on('error', function(event, data) {
			console.log('ajax error', data);
		});

		ajax.on('complete', function(event, data) {
			// console.log('ajax complete', data);
		});

		ajax.send();


		// or just return static data from ./app/api/leads.js
		// return leads;
	}

	componentDidMount() {
		// getData immediately and put in state
		this.getData();

		// setInterval to check for new data
		setInterval(() => {
			if (this.state.poll) {
				this.getData();
			}
		},  this.props.pollInterval);
	}

	expandOne(id) {
		let leads = this.state.data;
		leads.map((d) => {
			if (d.id === id) {
				d.stack = true;
			} else {
				d.stack = false;
				d.visible = false;
			}
		});
		
		this.setState({
			data: leads,
			poll: false,
		});
	}

	closeOne(id) {
		let leads = this.state.data;
		leads.map((d) => {
			d.stack = true;
		});
		
		this.setState({
			data: leads,
			poll: true,
		});
	}
	
	handleTransitionFinish() {
		let leads = this.state.data;
		leads.map((d) => {
			d.visible = true;
		});
		this.setState({ data: leads });
	}

	render() {
		// compare prevLeads and currLeads
		// one by one, compare the list, 
			// if one is different, splice the old one and add the new one
		const leads = _.sortBy(this.state.data, 'rank').map((lead) => {
			return (
				<Row lead={lead} key={lead.id} expandOne={this.expandOne.bind(this)} closeOne={this.closeOne.bind(this)} />
			)	
		});

		if (leads.length < 1) {
			return <h1>Loading...</h1>
		} else {
			return (
				<div id="app-container">
					<FlipMove duration={200} onFinish={this.handleTransitionFinish}>
						{leads}
					</FlipMove>
				</div>
			)
		}
	}
}

export default App;