import React from 'react';
import Row from './Row.js';

import '../styles/base.scss';

class App extends React.Component {
	render() {
		return (
			<div id="app-container">
				<Row coName="FDNY" perc="50%" step="materials" date="6/6" division="labs"/>
				<Row coName="Cisco" perc="50%" step="proposal" date="5/20"division="safety"/>
				<Row coName="Intel" perc="80%" step="demo" date="6/16" division="labs"/>
				<Row coName="SUNY/LR" perc="80%" step="follow-up" date="6/2" division="labs"/>
				<Row coName="Beacon Mutual Ins." perc="55%" step="follow-up" date="6/6" division="safety"/>
			</div>
		)
	}
}

export default App;