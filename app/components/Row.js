import React from 'react';
import classNames from 'classnames';
import { Panel } from 'react-bootstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


// stylesheet
import '../styles/Row.scss';

class Row extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			openReady: false,
			alertOn: false,
		}
	}

	toggleHover(event) {
		this.setState({ hover: !this.state.hover });
	}

	handleClick() {
		this.state.open = !this.state.open;
		
		if (this.state.open) {
			this.props.expandOne(this.props.lead.id);
		} else {
			this.props.closeOne(this.props.lead.id);
		} 
	}

	render() {
		const rowClasses = classNames({
			'row-base': true,
			'row-closed': !this.props.openReady,
			'row-open' : this.props.openReady,
			'safety' : this.props.lead.division === 'safety',
			'hide' : !this.props.lead.stack, 
			'visible' : this.props.lead.visible,
			// 'alert' : this.state.alertOn,
			'animated pulse infinite' : this.props.lead.alert,
			// 'pulse' : this.state.alertOn,
			// 'infinite' : this.state.alertOn,
		});

		if (this.props.openReady) {
			return (
				<ReactCSSTransitionGroup transitionName="expand" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
					<div className={rowClasses} onClick={this.handleClick.bind(this)} key={1} >
					 	Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
					</div>
				</ReactCSSTransitionGroup>
			)
		} else {
			return (	
				<ul className={rowClasses} onMouseEnter={this.toggleHover.bind(this)} onMouseLeave={this.toggleHover.bind(this)} onClick={this.handleClick.bind(this)}>
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
}

Row.propTypes = {
	lead : React.PropTypes.object,
	expandOne: React.PropTypes.func,
	closeOne: React.PropTypes.func,
	openReady: React.PropTypes.bool,
}

export default Row;