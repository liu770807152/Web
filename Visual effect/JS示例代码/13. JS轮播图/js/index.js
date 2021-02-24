let bannerModule = (function () {
	let container = document.querySelector('.container'),
		wrapper = container.querySelector('.wrapper'),
		pagination = container.querySelector('.pagination'),
		navigation = container.querySelector('.navigation'),
		paginationList = pagination.querySelectorAll('span');

	let step = 0,
		interval = 1000,
		autoTimer = null;

	function autoMove() {
		step++;
		if (step >= 4) {
			wrapper.style.transitionDuration = '0ms';
			wrapper.style.left = `0px`;
			step = 1;
			wrapper.offsetLeft;
		}
		wrapper.style.transitionDuration = '300ms';
		wrapper.style.left = `${-step*520}px`;
		paginationFocus();
	}

	function paginationFocus() {
		let temp = step;
		temp === 3 ? temp = 0 : null;
		[].forEach.call(paginationList, (item, index) => {
			item.className = temp === index ? 'active' : '';
		});
	}

	return {
		init() {
			autoTimer = setInterval(autoMove, interval);
			container.onmouseenter = function () {
				clearInterval(autoTimer);
			};
			container.onmouseleave = function () {
				autoTimer = setInterval(autoMove, interval);
			};

			navigation.onclick = function (ev) {
				let target = ev.target;
				if (target.tagName === "A") {
					if (target.className === "left") {
						// 左按钮
						step--;
						if (step < 0) {
							wrapper.style.transitionDuration = '0ms';
							wrapper.style.left = `${-3*520}px`;
							step = 2;
							wrapper.offsetLeft;
						}
						wrapper.style.transitionDuration = '300ms';
						wrapper.style.left = `${-step*520}px`;
						paginationFocus();
						return;
					}
					// 右按钮
					autoMove();
				}
			};
		}
	};
})();
bannerModule.init();