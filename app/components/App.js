import React from 'react';
import _ from 'underscore'
import Ajax from 'simple-ajax';
import FlipMove from 'react-flip-move';
import * as parseData from './helpers/parseData.js';

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
			openReady: false,
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
				if (parseData.date(d.date)) {
					d.alert = true;
				} else {
					d.alert = false;
				}
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
				d.expand = true; // currently not using in Row
				if (d.rank === 1) { // top item in list is unaffected by transitions and related callbacks
					this.setState({ openReady: true });
				}
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
			if (d.id === id) {
				d.expand = false;
			} else {
				d.stack = true;
			}
		});
		
		this.setState({
			data: leads,
			poll: true,
			openReady: false,
		});
	}

	handleTransitionFinish(node, element) {
		let leads = this.state.data;
		if(this.state.poll) {
			leads.map((d) => {
			d.visible = true;
		});
			this.setState({ 
				data: leads,
				poll: this.state.poll,
			 });	
		} else {
			this.setState({ openReady: true });
		}
	}

	render() {
		// compare prevLeads and currLeads
		// one by one, compare the list, 
			// if one is different, splice the old one and add the new one
		const leads = _.sortBy(this.state.data, 'rank').map((lead) => {
			return (
				<Row lead={lead} key={lead.id} expandOne={this.expandOne.bind(this)} closeOne={this.closeOne.bind(this)} openReady={this.state.openReady} />
			)	
		});

		if (leads.length < 1) {
			return <h1>Loading...</h1>
		} else {
			return (
				<div id="app-container">
					<FlipMove duration={300} onFinish={this.handleTransitionFinish.bind(this)}>
						{leads}
					</FlipMove>
				</div>
			)
		}
	}
}

export default App;