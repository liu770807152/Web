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
Function.prototype.myCall = function (obj, ...params) {
  obj = obj || window;
  obj.temp = this;
  // 函数本身没有this，但是call的第一个参数是this，因此需要另外保存params
  let newArgs = [];
  for (let i = 1; i < arguments.length; i++) {
    // 如果是newArgs.push(arguments[i])，会将newArgs数组整体传入temp，而非分别独自传入
    newArgs.push("arguments[" + i + "]");
    // 结果newArgs = ['arguments[1]', 'arguments[2]', 'arguments[3]', 'arguments[4]']
  }
  // 因此我们需要利用eval执行字符串拼接后的代码，让params分别传入函数
  // 拼接后字符串长这样：'obj.temp(arguments[1], arguments[2], arguments[3], arguments[4])'
  let result = eval("obj.temp(" + newArgs + ")");
  delete obj.temp; // 不可改变原对象
  return result;
};

let test = person.myCall(hashimoto, '1', '2', '3', '4');
console.log(test);
