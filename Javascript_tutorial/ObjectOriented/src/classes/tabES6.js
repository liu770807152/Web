class Tab {
  constructor(mode) {
    this.mode = mode == 'fade' | mode == 'slide' ? mode : 'fade';
    this.oPage = $('.J_page');
    this.oTab = $('.J_tab');
    this.oPageWrap = this.oPage.children('.page-wrap');
    this.oPageItems = this.oPage.find('.item');

    this.init();
  }

  init() {
    this.setMode();
    this.bindEvent();
  }

  setMode() {
    this.oPageWrap.addClass(this.mode);
  }

  bindEvent() {
    this.oTab.on('click', '.item', $.proxy(this.tabClick, this));
  }

  tabClick() {
    var e = e || window.event,
      tar = e.target || e.srcElement,
      curIndex = $(tar).index();
    if (tar.className === 'item') {
      $(tar).addClass('current').siblings('.item').removeClass('current');
      this._pageChange(curIndex);
    }
  }

  _pageChange(index) {
    switch (this.mode) {
      case 'fade':
        this._fadePage(index);
        break;
      case 'slide':
        this._slidePage(index);
        break;
      default:
        this._fadePage(index);
        break;
    }
  }

  _fadePage(index) {
    this.oPageItems.eq(index).fadeIn(100).siblings('.item').fadeOut(100);
  }

  _slidePage(index) {
    this.oPageWrap.animate({
      left: (-index * 500) + 'px'
    });
  }
}

export { Tab };