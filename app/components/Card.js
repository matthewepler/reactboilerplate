import React from 'react';
import _ from 'underscore'
import FlipMove from 'react-flip-move';

// components
import Row from './Row.js';;

// stylesheets
import '../styles/card.scss';


class Card extends React.Component{
	constructor() {
		super();
		this.state = { 
			poll: true, // remove
			data: [],
			openReady: false, 
			stackSet: true, 
		};
	}

	componentWillMount() {
		this.setState( {data: this.props.ownerObj.leads} );
		// console.log(this.props.ownerObj.leads);
	}
	
	expandOne(id) {
		let leads = this.state.data;
		leads.map((d) => {
			if (d.id === id) {
				d.stack = true;
				if (d.rank === 1) { // FlipMove fix - top item in list is unaffected by transitions and related callbacks (handleTransitionFinish)
					this.setState({ openReady: true });
				}
			} else {
				d.stack = false;
				d.visible = false;
			}
		});
		
		this.setState({
			data: leads,
			poll: false,
			stackSet: false,
		});
	}

	closeOne(id) {
		let leads = this.state.data;
		leads.map((d) => {
			d.stack = true;
		});
		
		this.setState({
			data: leads,
			poll: true,
			openReady: false,
		});
	}

	handleTransitionFinish(node, element) {
		let leads = this.state.data;
		if(this.state.poll) { // if going back to a stacked list (exiting a single expanded)...
				leads.map((d) => { // turn all rows back to visible
				d.visible = true;
			});
			this.setState({ 
				data: leads,
				stackSet: true, // the stack is back in place, turn alert animation back on
			 });	
		} else {
			this.setState({ openReady: true }); // if expanding one row, let it open after it's at the top
		}
	}

	render() {
		const leads = _.sortBy(this.state.data, 'rank').map((lead) => {
			return (
				<Row lead={lead} key={lead.id} expandOne={this.expandOne.bind(this)} closeOne={this.closeOne.bind(this)} polling={this.state.poll} openReady={this.state.openReady} stackSet={this.state.stackSet}/>
			)	
		});

		if (leads.length < 1) {
			return <div id="loading">Loading...</div>
		} else {
			return (
				<div className="card-container">
					<div className="card-header">
						<h1>Name here.</h1>
					</div>
					<FlipMove duration={300} onFinish={this.handleTransitionFinish.bind(this)}>
						{leads}
					</FlipMove>
				</div>
			)
		}
	}
}

Card.propTypes = {
	ownerObj : React.PropTypes.object,
}

export default Card;