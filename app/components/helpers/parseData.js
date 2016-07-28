export function parseData(event, data) {
	let result = [];	
	let knownNames = [];

	data.map((d) => { 
		// add defaults for use in components later
		// d.stack = true; 		// affects 'hide' class for a Row (display: none, opacity: 0)
		// d.visible = true;		// affects 'visible' class for a Row (opacity: 1)
		if (checkDate(d.date)) {
			d.alert = true;		// afects alert animation class (controlled by animate.min.css)	
		} else {
			d.alert = false;
		}
		
		if (knownNames.includes(d.owner)) {
			result.find((r) => r.owner === d.owner).leads.push(d);
		} else {
			knownNames.push(d.owner);
			result.push({
				owner: d.owner,
				leads: [d],
			});
		}		 
	});
	
	for (var r of result) {
		if (r.leads.length < 5) {
			const diff = 5 - r.leads.length;
			for (var i=0; i<diff; i++) {
				r.leads.push({
					id: i+10,
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
	}
	return result;
}


function checkDate(date) {
	const alertThresh = 3; // number of days before an alert is triggered for a row
	const millisPerDay = 86400000;

	const today = new Date();
	const dateString = date.split('/');
	const dataDate = new Date(today.getFullYear(), dateString[0]-1, dateString[1]);
	if (dataDate - today < (millisPerDay * alertThresh)) { 
		return true ;
	} else {
		return false;
	}
}

/*
if (leads.length < 5) {
	const diff = 5 - leads.length;
	for (var i=0; i<diff; i++) {
		leads.push({
			id: i+10,
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
*/