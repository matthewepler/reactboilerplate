import React from 'react';
import classNames from 'classnames';
import { Panel } from 'react-bootstrap';

// stylesheet
import '../styles/Row.scss';

class Row extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hover: false,
			open: false,
		}
	}

	toggleHover() {
		this.setState({ hover: !this.state.hover });
	}

	handleClick() {
		this.state.open = !this.state.open;
		this.state.open ? this.props.expandOne(this.props.lead.id) : this.props.closeOne(this.props.lead.id);
	}

	render() {
		const liClasses = classNames({
			'row-container': true,
			'safety' : this.props.lead.division === 'safety',
			'row-hover' : this.state.hover,
			'hide' : !this.props.lead.stack, 
			'visible' : this.props.lead.visible,
		});

		return (	
			<ul className={liClasses} onMouseEnter={this.toggleHover.bind(this)} onMouseLeave={this.toggleHover.bind(this)} onClick={this.handleClick.bind(this)}>
				<li className="co-name">{this.props.lead.coName}</li>
				<ul className="row-data">
					<li className="row-data-bit">{this.props.lead.perc}</li>
					<li className="row-data-bit">{this.props.lead.step}</li>
					<li className="row-data-bit">{this.props.lead.date}</li>
				</ul>
			</ul>
		)
	}
}

Row.propTypes = {
	lead : React.PropTypes.object,
	expandOne: React.PropTypes.func,
	closeOne: React.PropTypes.func,
}

export default Row;