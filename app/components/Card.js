import React from 'react';
import _ from 'underscore'
import FlipMove from 'react-flip-move';
import classNames from 'classnames';
import equal from 'deep-equal';

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
			openId: null,
			openReady: false, 
			stackSet: true, 
		};
	}

	componentWillMount() {
		const ownerSplit =  this.props.ownerObj.owner.split(' ');
		this.setState({
			owner: [ ownerSplit[0].trim(), ownerSplit[1].trim() ],
			data: this.props.ownerObj.leads
		})
	}

	componentWillReceiveProps(nextProps) {
		if (!equal(nextProps, this.props)) {
			this.setState( {
				data: nextProps.ownerObj.leads,
			} );
		}
	}
	
	expandOne(id) {
		let leads = this.state.data;
		leads.map((d) => {
			if (d.id === id && d.rank === 1) {
				// FlipMove fix - top item in list is unaffected by transitions and related callbacks handleTransitionFinish)
				this.setState({ openReady: true });
			} 
		});
		
		this.setState({
			data: leads,
			openId: id,
			poll: false,
			stackSet: false,
		});
	}

	closeOne(id) {
		this.setState({
			openId: null,
			poll: true,
			openReady: false,
		});
	}

	handleTransitionFinish(node, element) {
		if(this.state.poll) { 
			this.setState({ stackSet: true });  // the stack is back in place, turn alert animation back on
		} else {
			this.setState({ openReady: true }); // if expanding one row, let it open after it's at the top
		}
	}

	getLeads() { 
		const leads = _.sortBy(this.state.data, 'rank');
		const result = leads.map((lead) => {
			return (
				<Row lead={lead} key={lead.id} expandOne={this.expandOne.bind(this)} closeOne={this.closeOne.bind(this)} polling={this.state.poll} openReady={this.state.openReady} stackSet={this.state.stackSet} openId={this.state.openId} dark={this.props.dark} />
			)	
		});
		return result;
	}


	render() {
		const cardClasses = classNames({
			'card-base' : true,
			'dark' : this.props.dark,
		});

		const leads = this.getLeads();

		if (leads.length < 1) {
			return (
				<div className={cardClasses}>
					<i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
					<span className="sr-only">Loading...</span>
				</div>
			)
		} else {
			return (
				<div className={cardClasses}>
					<div className="card-header">
						<div className="person">
							<img className={this.props.dark ? "photo photo-dark" : "photo photo-light"} src={"assets/img/" + this.state.owner.join('').toLowerCase() + ".jpg"} alt="owner photo" />
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