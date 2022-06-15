/**
 * IOS 확대 금지, 더블탭 시 확대 금지
 */
function prohibitZoomAction() {
	console.log(
		'%c%s',
		'color:#1AA488;background:#e0f9f4;font-size:11px;padding-right:10px;',
		'[prohibitZoomAction.js] 초기화',
	);

	if (
		(/iPad|iPhone|iPod/.test(navigator.platform) ||
			(navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) &&
		!window.MSStream
	) {
		// IOS 확대 금지
		document.addEventListener(
			'touchstart',
			e => {
				if (event.touches.length > 1) e.preventDefault();
			},
			{ passive: false },
		);

		// 더블탭 확대 금지
		let lastTouchEnd = 0;
		document.addEventListener(
			'touchend',
			e => {
				const now = new Date().getTime();
				if (now - lastTouchEnd <= 300) e.preventDefault();
				lastTouchEnd = now;
			},
			false,
		);
	}
}
export { prohibitZoomAction };
