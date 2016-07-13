import React from 'react';
import classNames from 'classnames';

// stylesheet
import '../styles/Row.scss';

class Row extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hover: false,
		}
	}

	componentDidMount() {
		this.setState({ rank: this.props.rank });
	}

	// componentWillUpdate() {
	// 	this.setState({ rank: this.props.rank });
	// }

	componentWillReceiveProps(nextProps) {
	  if (nextProps.rank !== this.state.rank) {
	  	console.log("componentWillReceiveProps");
	  	console.log(nextProps.rank);
	    this.setState({ rank: nextProps.rank });
	  }
	}

	toggleHover() {
		this.setState({ hover: !this.state.hover });
	}

	render() {
		const liClasses = classNames({
			'row-container': true,
			'safety' : this.props.division === 'safety',
			'row-hover' : this.state.hover,
		});

		return (	
			<ul className={liClasses} onMouseEnter={this.toggleHover.bind(this)} onMouseLeave={this.toggleHover.bind(this)}>
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
	division: React.PropTypes.string,
}

export default Row;