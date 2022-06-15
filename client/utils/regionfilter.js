function regionfilter(region) {
	if (region == null || region === undefined || region.length === 0)
		return null;
	const regionList = [
		{ name: 'korea', value: '대한민국' },
		{ name: 'eu', value: '유럽' },
		{ name: 'usa', value: '미국' },
		{ name: 'asia', value: '아시아' },
		{ name: 'ect', value: '기타' },
	];
	let index = regionList.findIndex(el => el.name === region);
	if (index === -1) {
		index = 4;
	}
	return regionList[index].value;
}

export { regionfilter };
