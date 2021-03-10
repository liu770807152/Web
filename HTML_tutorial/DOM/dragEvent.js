/**
 * 用DOM0级事件实现窗口的拖曳
 */
function drag() {
  var container = getElementByClassName('xxx');
  container.onmousedown = onMouseDown;
}

function onMouseDown(event) {
  event = event || window.event;
  var oDrag = document.getElementByClassName('xxx'),
      // 光标按下时光标和容器左上角的距离
      offsetX = event.clientX - oDrag.offsetLeft,
      offsetY = event.clientY - oDrag.offsetTop;
  // 移动
  document.onmousemove = function(event) {
    event = event || window.event;
    move(event, offsetX, offsetY, oDrag);
  }
  // 释放
  document.onmouseup = function() {
    document.onmousemove = null;
    document.onmouseup = null;
  }
}

function move(event, offsetX, offsetY, oDrag) {
  // 考虑了光标和窗口左上角距离后，算出的窗口坐标
  // 因为拖曳时光标总是在窗口内，所以窗口在拖曳后的坐标总是要再往左和上移动点距离
  var left = event.clientX - offsetX, 
      top = event.clientY - offsetY,
      // 浏览器的长和宽
      winW = document.documentElement.clientWidth || document.body.clientWidth,
      winH = document.documentElement.clientHeight || document.body.clientHeight,
      // 能拖动的最大范围
      maxW = winW - oDrag.offsetWidth - 10,
      maxH = winH - oDrag.offsetHeight - 10;
  // 框应该不可以拖出浏览器窗口
  if (left < 0) {
    left = 0;
  } else if (left > maxW) {
    left = maxW;
  }
  if (top < 0) {
    top = 0;
  } else if (top > maxH) {
    top = maxH;
  }
  oDrag.style.left = left + 'px';
  oDrag.style.top = top + 'px';
}
