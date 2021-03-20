const deepClone = require('./deepCopy.js');

/*=========================1. forEach=========================*/
/* 使用 */
let arr = [1, 2, 3];
arr.forEach(function (item, index, array) {
  console.log(item, index, array);
});
console.log('==================================================');
/* 实现 */
function myForEach(callback) {
  let _arr = this;
  let _len = _arr.length;
  let _arg2 = arguments[1] || window;
  for (let i = 0; i < _len; i++) {
    callback.apply(_arg2, [_arr[i], i, _arr]); // 如果传入了_arg2，更改this指向到_arg2，[_arr[i], i, _arr]对应item, index, array
  }
}

/*=========================2. map 映射=========================*/
/* 使用 */
let newArray = arr.map(function (item, index, array) {
  return item * 2;
});
console.log(newArray); // ->  [2, 4, 6]
console.log('==================================================');
/* 实现 */
function myMap(callback) {
  let _arr = this;
  let _len = _arr.length;
  let _arg2 = argument[1] || window;
  let _newArr = [];
  let _item;

  for (let i = 0; i < _len; i++) {
    _item = deepClone(_arr[i]);
    _res = callback.apply(_arg2, [_item, i, _arr]); // 解决callback无返回值时返回[undefined, undefined, …]的问题，默认应返回[]
    _res && _newArr.push(_res);
  }
  return _newArr;
}

/*=========================3. filter=========================*/
/* 使用 */
newArray = arr.filter(function (item, index, array) {
  return item % 2;
});
console.log(newArray); // ->  [1, 3]
console.log('==================================================');
/* 实现 */
function myFilter(callback) {
  let _arr = this;
  let _len = _arr.length;
  let _arg2 = argument[1] || window;
  let _newArr = [];
  let _item;

  for (let i = 0; i < _len; i++) {
    _item = deepClone(_arr[i]);
    callback.apply(_arg2, [_item, i, _arr]) ? _newArr.push(_item) : "";
  }
  return _newArr;
}

/*=========================4. every=========================*/
/* 使用 */
// 每一次迭代的结果都是true，结果才返回true
newArray = arr.every(function (item, index, array) {
  return item % 2;
});
console.log(newArray); // ->  false
console.log('==================================================');
/* 实现 */
function myEvery(callback) {
  let _arr = this;
  let _len = _arr.length;
  let _arg2 = argument[1] || window;
  let _newArr = [];
  let _res = true;

  for (let i = 0; i < _len; i++) {
    if (!callback.apply(_arg2, [_arr[i], i, _arr])) {
      _res = false;
      break;
    }
  }
  return _res;
}

/*=========================5. some=========================*/
/* 使用 */
// 有一次迭代的结果是true，结果就返回true
newArray = arr.some(function (item, index, array) {
  return item % 2;
});
console.log(newArray); //  ->  true
console.log('==================================================');
/* 实现 */
function mySome(callback) {
  let _arr = this;
  let _len = _arr.length;
  let _arg2 = argument[1] || window;
  let _newArr = [];
  let _res = false;

  for (let i = 0; i < _len; i++) {
    if (callback.apply(_arg2, [_arr[i], i, _arr])) {
      _res = true;
      break;
    }
  }
  return _res;
}

/*=========================6. reduce归纳=========================*/
/* 使用 */
let initialValue = 0;
// prev就是初始值
newArray = arr.reduce(function (prev, item, index, array) {
  prev += item;
  return prev;
}, initialValue);
console.log(newArray); // ->  6
console.log('==================================================');
/* 实现 */
function myReduce(callback, initialValue) {
  let _arr = this;
  let _len = _arr.length;
  let _arg3 = argument[2] || window;
  let _item;

  for (let i = 0; i < _len; i++) {
    _item = deepClone(_arr[i]);
    initialValue = callback.apply(_arg3, [initialValue, _item, i, _arr]);
  }
  return initialValue;
}

/*=========================7. reduceRight=========================*/
/* 使用 */
initialValue = [];
// prev就是初始值
newArray = arr.reduceRight(function (prev, item, index, array) {
  prev.push(item);
  return prev;
}, initialValue);
console.log(newArray); // ->  [3, 2, 1]
console.log('==================================================');
/* 实现 */
function myReduce(callback, initialValue) {
  let _arr = this;
  let _len = _arr.length;
  let _arg3 = argument[2] || window;
  let _item;

  for (let i = _len - 1; i >= 0; i--) {
    _item = deepClone(_arr[i]);
    initialValue = callback.apply(_arg3, [initialValue, _item, i, _arr]);
  }
  return initialValue;
}

/*=========================8. for...in=========================*/
// 	遍历对象属性而构建的，不建议用于数组；
//	切记遍历顺序是任意的，对象有除Symbol外的可枚举属性 ->
//    ○ 可枚举属性是指那些内部 “enumerable” 标志设置为 true 的属性；
//    ○ 对于通过 Object.defineProperty 等定义的属性，该标识值默认为 false
//    ○ 基本包装类型的原型属性是不可枚举的，如Object, Array, Number等
//    ○ for … in 除了遍历自己对象上的的可枚举属性，还遍历了原型上可枚举属性

/*=========================9. for..of=========================*/
//  利用iterator进行迭代，拿到键值。
//  Array/String/Map/Set/Argument/HTMLCollection都有Symbol.iterator，唯独Object没有！

/*=========================10. 添加元素至末尾 push()=========================*/

/*=========================11. 添加元素至头部 unshift()=========================*/

/*=========================12. 删除末尾元素 pop()=========================*/

/*=========================13. 删除头部元素 shift()=========================*/

/*=========================14. 找索引 indexOf(element)=========================*/

/*=========================15. 通过索引删除 splice(pos, num)=========================*/

/*=========================16. 浅拷贝数组 slice()=========================*/
//  对象只复制引用，String, Number & Boolean复制值
//  拷贝后其中一个数组的变化不会影响另一个数组
