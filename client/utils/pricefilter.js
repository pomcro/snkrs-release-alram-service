function convertPrice(value) {
	if (!value) return '';
	value = value
		.toString()
		.replace(',', '')
		.replace(' ', '');
	if (value.includes('$')) {
		value = value.substr(1, value.length);
		value = Number(value) * 1200;
	} else if (value.includes('￦') || value.includes('₩')) {
		value = value.substr(1, value.length);
	}
	return !value ? '0' : value;
}

function pricefilter(value) {
	if (!value) return '';
	value = value
		.toString()
		.replace(',', '')
		.replace(' ', '');
	if (value.includes('$')) {
		value = value.substr(1, value.length);
		value = Number(value) * 1200;
	} else if (value.includes('￦') || value.includes('₩')) {
		value = value.substr(1, value.length);
	}
	return !value ? '0' : value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function premiumfilter(value, markets) {
	if (!value) return '-';
	if (markets.length < 1) return '-';
	let total = 0;
	value = convertPrice(value);
	for (let i = 0; i < markets.length; i++) {
		total += Number(markets[i].price);
	}
	const average = total / markets.length;
	return parseInt(Number(((average - value) / value) * 100));
}
export { pricefilter, premiumfilter };
