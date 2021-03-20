// 为何改为箭头函数后，结果中的name是undefined？
function person(a, b, c, d) {
  return {
    name: this.name,
    a: a, b: b, c: c, d: d
  };
};
let hashimoto = {
  name: "Hashimoto",
};

// 自己实现
Function.prototype.myCall = function (obj, arr) {
  obj = obj || window, result = null;
  obj.temp = this;
  if (!arr) {
    result = obj.temp();
  } else {
    let newArgs = [];
    for (let i = 0; i < arr.length; i++) {
      newArgs.push('arr[' + i + ']');
    }
    result = eval('obj.temp(' + newArgs + ')');
  }
  delete obj.temp; // 不可改变原对象
  return result;
};

let test = person.myCall(hashimoto, ['1', '2', '3', '4']);
console.log(test);
