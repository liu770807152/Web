var eventUtil = {
	// 添加句柄, 以type='click'为例
	addHandler: function(element, type, handler) {
    if (element.addEventListener) {
      // DOM2级
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      // IE
      element.attachEvent('on'+type, handler);
    } else {
      // DOM0级
      element['on'+type] = handler;
    }
  },
	// 删除句柄, 以type='click'为例
	removeHandler: function(element, type, handler) {
		if (element.removeEventListener) {
			// DOM2级
			element.removeEventListener(type, handler, false);
		} else if (element.detachEvent) {
			// IE
			element.detachEvent('on'+type, handler);
		} else {
			// DOM0级
			element['on'+type] = null;
		}
	}
}
