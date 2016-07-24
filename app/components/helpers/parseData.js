export function parseData(event, data) {
	let result = [];	
	let knownNames = [];

	data.map((d) => { 
		// add defaults for use in components later
		d.stack = true; 
		d.visible = true;
		if (checkDate(d.date)) {
			d.alert = true;
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
	
	// console.log(knownNames);
	// console.log(result);
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

