// 为何改为箭头函数后，结果中的name是undefined？
function person(a, b, c) {
  console.log(this.name);
  console.log(a, b, c);
};
let hashimoto = {
  name: "Hashimoto",
};

// 自己实现
Function.prototype.myBind = function(obj, ...params) {
  if (typeof this !== 'function') {
    throw new TypeError('Type error!');
  }
  const thisFunc = this, // 保存当前调用的函数
    arr = Array.prototype.slice.call(arguments, 1);
  // 注意，return外的arguments是第一个括号里的参数，return内的是第二个括号里的参数！
  return function() {
    let arr2 = Array.prototype.slice.call(arguments),
    // 合并所有括号里的参数
      arrSum = arr.concat(arr2); 
    thisFunc.apply(obj, arrSum);  
  }
}

// bind支持柯里化
person.myBind(hashimoto, '1')('2', '3');

// bind还支持new, 涉及原型链知识，具体见：https://www.bilibili.com/video/BV1m54y1q7hc/
let a = person.myBind(hashimoto, '1');
let b = new a('2', '3');