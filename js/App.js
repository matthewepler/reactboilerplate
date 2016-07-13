import React from 'react';
import _ from 'underscore'

// components
import Row from './Row.js';;

// data
import { leads } from './api/leads.js'

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

	changeData() {
		this.setState( {rankChange : true} );
	}

	componentDidMount() {
		// setInterval(this.getData, this.props.pollInterval);
		setTimeout( this.changeData.bind(this), 2000);
	}
	
	render() {
		return (
			<div id="app-container">
				{_.sortBy(this.getData(), 'rank').map((lead) => (
					<Row coName={lead.coName} perc={lead.perc} step={lead.step} date={lead.date} division={lead.division} rank= {lead.rank === 1 && this.state.rankChange ? "6" : lead.rank} key={lead.rank}/> 
				))}
			</div>
		)
	}
}

export default App;