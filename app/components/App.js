import React from 'react';
import _ from 'underscore'

// components
import Row from './Row.js';;

// data
import { leads } from '../api/leads.js'

// stylesheets
import '../styles/base.scss';

class App extends React.Component {

	constructor() {
		super();
		this.state = { rankChange : false };
	}
	
	getData() {
		return leads;
	}

	componentDidMount() {
		setInterval(this.getData, this.props.pollInterval);
	}
	
	render() {
		return (
			<div id="app-container">
				{_.sortBy(this.getData(), 'rank').map((lead) => (
					<Row coName={lead.coName} perc={lead.perc} step={lead.step} date={lead.date} division={lead.division} rank= {lead.rank} key={lead.rank}/> 
				))}
			</div>
		)
	}
}

export default App;