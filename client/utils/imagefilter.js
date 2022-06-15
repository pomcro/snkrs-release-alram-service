function imagefilter320(value) {
	if (String(value).includes('None')) {
		return require('@/assets/img/no_image_transparent.png');
	}
	return String(value).replace('1080', '320');
}
function imagefilter1080(value) {
	if (String(value).includes('None')) {
		return require('@/assets/img/no_image_transparent.png');
	}
	return String(value).replace('320', '1080');
}
function imagefilter640(value) {
	if (String(value).includes('None')) {
		return require('@/assets/img/no_image_transparent.png');
	}
	return String(value).replace('320', '640');
}

export { imagefilter320, imagefilter1080, imagefilter640 };
