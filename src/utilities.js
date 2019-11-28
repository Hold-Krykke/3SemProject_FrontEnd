const parseDate = date => {
	let month = date.getMonth() + 1; //0-indexed
	let day = date.getDate();

	if (month < 10) month = '0'.concat(month); //ticketmaster API requires "YYYY-MM-DD", this would be "YYYY-MM-D"
	if (day < 10) day = '0'.concat(day);
	return '' + date.getFullYear() + '-' + month + '-' + day;
};

export default parseDate;
