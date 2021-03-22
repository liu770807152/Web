;(function() {
  var searchInput = document.querySelector('.J_search-input'),
      wdList = document.querySelector('.J_wd-list'),
      listTpl = document.querySelector('#J_listTpl').innerHTML;
  
  function init() {
    bindEvent();
  }

  function bindEvent() {
    // false表示在冒泡阶段处理事件
    searchInput.addEventListener('input', typeInput, false);
  }

  function typeInput() {
    var value = _trimSpace(this.value);
     getData(value, 'setData');
  }

  function getData(val, callBack) {
    var oScript = document.createElement('script');
    oScript.src = 'http://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=33344,31253,33692,33595,33676,33392,33600&wd='
       + val
       + '&req=2&bs=a&pbs=a&csor=1&pwd=ab&cb='
       + callBack;
    // append只用于传递数据
    document.body.appendChild(oScript);
    // 拿到数据后就马上移除这个无用节点
    document.body.removeChild(oScript);
  }

  window.setData = function(data) {
    renderList(data);
  }

  function renderList(data) {
    // 拿到候选列表
    var data = data.g, len = 0, list = '';
    // len可能会0
    try {
      len = data.length;
    } catch(e) {
      len = 0;
    }
    // 替换数据
    if (len > 0) {
      data.forEach((item) => {
      list += listTpl.replace(/{{(.*?)}}/gim, function($, $1) {
        return {
          wd: item.q,
          wdLink: item.q
        }[$1];
      });
    });
    } else {
      list = '';
    }
    // 添加到ul上
    wdList.innerHTML = list;
  }
  
  function _trimSpace(str) {
    return str.replace(/\s+/, '');
  }

  init();
})();