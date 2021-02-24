let bannerModule = (function () {
	// 获取需要操作的DOM元素
	let container = document.querySelector('.container'),
		wrapper = container.querySelector('.wrapper'),
		pagination = container.querySelector('.pagination'),
		paginationList = pagination.querySelectorAll('span'),
		navigation = container.querySelector('.navigation');

	let step = 0,
		autoTimer = null,
		interval = 1000;

	// 自动轮播
	function autoMove() {
		step++;
		if (step >= 4) {
			wrapper.style.transitionDuration = '0ms';
			wrapper.style.left = '0px';
			step = 1;
			wrapper.offsetWidth;
		}
		wrapper.style.transitionDuration = '300ms';
		wrapper.style.left = `${-step*520}px`;
		paginationFocus();
	}

	// 焦点对齐
	function paginationFocus() {
		let temp = step;
		temp === 3 ? temp = 0 : null;
		[].forEach.call(paginationList, (item, index) => {
			item.className = index === temp ? "active" : "";
		});
	}

	return {
		init() {
			// 控制自动轮播和暂停自动轮播
			autoTimer = setInterval(autoMove, interval);
			container.onmouseenter = function () {
				clearInterval(autoTimer);
			};
			container.onmouseleave = function () {
				autoTimer = setInterval(autoMove, interval);
			};

			// 导航按钮的控制
			navigation.onclick = function (ev) {
				let target = ev.target;
				if (target.tagName === 'A') {
					if (target.className === "left") {
						// 左按钮
						step--;
						if (step < 0) {
							wrapper.style.transitionDuration = '0ms';
							wrapper.style.left = `${-520*3}px`;
							step = 2;
							wrapper.offsetWidth;
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