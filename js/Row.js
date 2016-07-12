import React from 'react';

// stylesheet
import '../styles/Row.scss';

class Row extends React.Component {
	render() {
		return (	
			<ul className="row-container">
				<li className="co-name">{this.props.coName}</li>
				<ul className="row-data">
					<li className="row-data-bit">{this.props.perc}</li>
					<li className="row-data-bit">{this.props.step}</li>
					<li className="row-data-bit">{this.props.date}</li>
				</ul>
			</ul>
		)
	}
}

Row.propTypes = {
	coName : React.PropTypes.string,
	perc : React.PropTypes.string,
	step : React.PropTypes.string,
	date : React.PropTypes.string,
}

export default Row;