import moment from 'moment';

function rafflefilter(value) {
	if (!value) return '';
	return moment(value).format('MM/DD HH:mm');
}
function datefilter(value) {
	if (!value) return '';
	return moment(value).format('YYYY-MM-DD');
}
function simpledatefilter(value) {
	if (!value) return '';
	return moment(value).format('YYYY/MM/DD');
}
function datefilterMarket(value) {
	if (!value) return '';
	const sinceDate = timeSince(value);
	if (sinceDate.includes('분') || sinceDate.includes('시간'))
		return timeSince(value);
	return simpledatefilter(value);
}

function dayNameFilter(date) {
	const days = ['일', '월', '화', '수', '목', '금', '토'];
	date = moment(date);
	return days[date.day()];
}

function timeSince(date) {
	date = moment(date);
	const seconds = Math.floor((new Date() - date) / 1000);

	let interval = seconds / 31536000;

	if (interval > 1) {
		return Math.floor(interval) + '년 전';
	}
	interval = seconds / 2592000;
	if (interval > 1) {
		return Math.floor(interval) + '달 전';
	}
	interval = seconds / 86400;
	if (interval > 1) {
		return Math.floor(interval) + '일 전';
	}
	interval = seconds / 3600;
	if (interval > 1) {
		return Math.floor(interval) + '시간 전';
	}
	interval = seconds / 60;
	if (interval > 1) {
		return Math.floor(interval) + '분 전';
	}
	return Math.floor(seconds) + '초 전';
}

export {
	simpledatefilter,
	datefilter,
	timeSince,
	dayNameFilter,
	datefilterMarket,
	rafflefilter,
};
