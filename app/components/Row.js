import React from 'react';
import classNames from 'classnames';
import { Panel } from 'react-bootstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import AnimateOnChange from 'react-animate-on-change';


// stylesheet
import '../styles/Row.scss';

class Row extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
		}
	}

	toggleHover(event) {
		this.setState({ hover: !this.state.hover });
	}

	handleClickClosed() {
		this.state.open = !this.state.open;
		this.props.expandOne(this.props.lead.id);
	}
		
	handleClickOpen() {
		this.state.open = !this.state.open;
		this.props.closeOne(this.props.lead.id);
	} 
	

	render() {
		const rowClasses = classNames({
			'row-base': true,
			'row-closed': !this.props.openReady, // triggered at end of animation of a row to the top
			'row-open' : this.props.openReady,
			'safety' : this.props.lead.division === 'safety',
			'hide' : !this.props.lead.stack, 
			'visible' : this.props.lead.visible,
			'animated pulse infinite' : this.props.lead.alert && this.props.stackSet,
		});

		if (this.props.openReady) {
			return (
				<ReactCSSTransitionGroup transitionName="expand" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
					<div className={rowClasses} onClick={this.handleClickOpen.bind(this)} key={1} >
					 	Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
					</div>
				</ReactCSSTransitionGroup>
			)
		} else {
			return (
				<ul className={rowClasses} onMouseEnter={this.toggleHover.bind(this)} onMouseLeave={this.toggleHover.bind(this)} onClick={this.handleClickClosed.bind(this)}>
					<li className="co-name">{this.props.lead.coName}</li>
					<ul className="row-data">
						<li className="row-data-bit">{this.props.lead.perc}</li>
						<li className="row-data-bit">{this.props.lead.step}</li>
						<AnimateOnChange
							baseClassName="date" 
	          				animationClassName="date-new" 
	          				animate={true}>
								<li className="row-data-bit">{this.props.lead.date}</li>
						</AnimateOnChange>
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
	stackSet: React.PropTypes.bool,
}

export default Row;