let obj = {
  a: 1,
  b: 2,
  c: {
    d: 3,
    e: [4, 5],
  },
  f: function (x, y) {
    return x + y;
  },
};

// JSON
console.log(JSON.parse(JSON.stringify(obj))); // obj.f is gone!

// ES6前：
function deepClone(origin, target) {
  let tar = target || {};
  let toStr = Object.prototype.toString;
  let arrType = "[object Array]";

  for (let k in origin) {
    // key可能在原型上，因此要判断key是不是非原型的属性，是的话继续
    if (origin.hasOwnProperty(k)) {
      if (typeof origin[k] === "object" && origin[k] !== null) {
        tar[k] = toStr.call(origin[k]) === arrType ? [] : {}; //  Object.prototype.toString.call([]) 得到 '[object Array]'
        // 递归进入嵌套对象内部进行拷贝
        deepClone(origin[k], tar[k]);
      } else {
        tar[k] = origin[k];
      }
    }
  }
  return tar;
}
let result = deepClone(obj);
console.log(result);
obj.c.e[0] = 100;
console.log(result);
obj.c.e[0] = 4;

/* ES6后:
	用constructor()构造一个与obj类型一致的对象
	const obj = {};
	const newObj = new obj.constructor();
	newObj.a = 1; // 原obj不更新a的值
*/
function deepClone2(origin, hashMap = new WeakMap()) {
  // 不是对象，则不需要拷贝
  if (origin == undefined || typeof origin !== "object") {
    // 判断是否为undefined时切记用双等号！
    return origin;
  }
  // 解析对象类型，返回对应类型
  if (origin instanceof Date) {
    return new Date(origin);
  }
  if (origin instanceof RegExp) {
    return new RegExp(origin);
  }
  // 查看当前对象有没有被拷贝过，有则直接返回
  const hashValue = hashMap.get(origin);
  if (hashValue) {
    return hashValue;
  }
  // 存储当前对象
  const target = new origin.constructor();
  hashMap.set(origin, target);
  // 递归拷贝
  for (let k in origin) {
    if (origin.hasOwnProperty(k)) {
      target[k] = deepClone2(origin[k], hashMap);
    }
  }
  return target;
}
result = deepClone2(obj);
console.log(result);
obj.c.e[0] = 100;
console.log(result);
obj.c.e[0] = 4;

/* JQuery版：
	1. 引入JQuery
	  <script src="JQuery的URL">
  2. return $.extend(true, des, src); // param1：深拷贝true，浅拷贝false；param2：目标obj；param3：源obj
*/

module.exports = { deepClone };
