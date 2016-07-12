import React from 'react';
import Row from './Row.js';

import '../styles/base.scss';

class App extends React.Component {
	render() {
		return (
			<div id="app-container">
				<Row />
			</div>
		)
	}
}

export default App;