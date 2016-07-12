import React from 'react';
import Row from './Row.js';

import '../styles/base.scss';

class App extends React.Component {
	render() {
		return (
			<div id="app-container">
				<Row coName="Beacon Mutual Ins." perc="55%" step="follow-up" date="6/6"/>
				<Row coName="Intel" perc="80%" step="demo" date="6/16"/>
			</div>
		)
	}
}

export default App;