export function date(date) {
	
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

