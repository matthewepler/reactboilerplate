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
			owner: [],
			data: [],
			openReady: false, 
			stackSet: true, 
		};
	}

	componentWillMount() {
		const ownerSplit =  this.props.ownerObj.owner.split(' ');	
		this.setState({ 
			owner: [ ownerSplit[0].trim(), ownerSplit[1].trim() ] 
		});
	}

	componentWillReceiveProps(nextProps) {
		this.setState( {
			data: nextProps.ownerObj.leads,
		} );
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

	prepData() {
		const leads = _.sortBy(this.state.data, 'rank');
		
		if (leads.length < 5) {
			const diff = 5 - leads.length;
			for (var i=0; i<diff; i++) {
				leads.push({
					id: i,
					coName: '-',
					perc: '-',
				    step: '-',
				    date: '-',
				    division: '-',
				    rank: '5',
				    owner: '-',
				    alert: false,
				    stack: true,
				    visible: true
				});
			}
		}
		
		// console.log(leads);
		const result = leads.map((lead) => {
			return (
				<Row lead={lead} key={lead.id} expandOne={this.expandOne.bind(this)} closeOne={this.closeOne.bind(this)} polling={this.state.poll} openReady={this.state.openReady} stackSet={this.state.stackSet}/>
			)	
		});
		return result;
	}

	render() {
		const leads = this.prepData();
		const imageURL = "assets/img/" + this.state.owner.join('').toLowerCase() + ".jpg"

		if (leads.length < 1) {
			return <div id="loading">Loading...</div>
		} else {
			return (
				<div className="card-container">
					<div className="card-header">
						<div className="person">
							<img className="photo" src={imageURL} alt="owner photo" />
							<div className="nametag">
								<h1>{this.state.owner[0]}</h1>
								<h1>{this.state.owner[1]}</h1>
							</div>
							<div className="card-rank">{this.props.rank + 1}</div>
						</div>
					</div>
					<FlipMove className="row-container" duration={300} onFinish={this.handleTransitionFinish.bind(this)}>
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