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

let lessons = [
  { code: 'COMP6710' },
  { code: 'COMP6720' },
  { code: 'COMP6730' },
];
let hd = lessons.map(function(value) {
  value.difficulty = 'easy';
  return value;
});
console.log(hd); //  { code: 'COMP6710', difficulty: 'easy' }
/* 原数组也改变了！ */
console.log(lessons); //  { code: 'COMP6710', difficulty: 'easy' }

/* 解决方法：用Object.assign() */
lessons = [
  { code: 'COMP6710' },
  { code: 'COMP6720' },
  { code: 'COMP6730' },
];
hd = lessons.map(function(value) {
  // 前后顺序千万不能反！
  return Object.assign({ difficulty: 'easy' }, value);
});
console.log(hd); //  { code: 'COMP6710', difficulty: 'easy' }
/* 原数组不变！ */
console.log(lessons); //  { code: 'COMP6710' }
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
// 如果没有设置初始值，则prev是第一个值，从第二个值开始遍历
/* 使用 */
arr = [1, 2, 3];
let initialValue = 0;
// prev就是初始值
newArray = arr.reduce(function (prev, item, index, array) {
  prev += item;
  return prev;
}, initialValue);
console.log(newArray); //  6
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

/* 应用：获取最贵的商品 */
let cart = [
  { name: 'iphone', price: 12000 },
  { name: 'ipad', price: 3600 },
  { name: 'imac', price: 25000 }
];
function maxPrice(goods) {
  return goods.reduce(function(prev, item) {
    return prev.price > item.value ? prev : item;
  });
}
console.log(maxPrice(cart)); //  { name: 'imac', price: 25000 }
/* 应用：汇总商品价格 */
cart = [
  { name: 'iphone', price: 12000 },
  { name: 'ipad', price: 3600 },
  { name: 'imac', price: 25000 }
];
function sumPrice(goods) {
  return goods.reduce(function(prev, item) {
    return (prev += item.price);
  }, 0);
}
console.log(sumPrice(cart)); //  40600
/* 应用：获取价格超过10000的商品 */
cart = [
  { name: 'iphone', price: 12000 },
  { name: 'ipad', price: 3600 },
  { name: 'imac', price: 25000 }
];
function getNameBeyondPrice(goods, price) {
  return goods.reduce(function(arr, item) {
    if (item.price > price)
      arr.push(item);
    return arr;
  }, []).map(function(item) {
    return item.name;
  });
}
console.log(getNameBeyondPrice(cart, 20000)); //  { name: 'imac', price: 25000 }
/* 数组去重 */
arr = [1, 2, 3, 3, 1, 4, 2];
let newArr = arr.reduce(function(arr, item) {
  // 注意。如果数组里的是对象，则不能用includes()，只能用find()！
  if (!arr.includes(item)) {
    arr.push(item);
  }
  return arr;
}, []);
console.table(newArr); //  [1, 2, 3, 4]

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
initialValue = 0;
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

/*=========================13. 填充 fill()=========================*/
console.log(Array(5).fill(0)); //  [0, 0, 0, 0, 0]
console.log([1, 2, 3, 4].fill('s', 1, 3)); //  [1, 's', 's', 4]
console.log('==================================================');

/*=========================14. 找第一个索引 indexOf(element, [indexToStartSearch)=========================*/
// 找不到返回-1

/*=========================14. 找最后一个索引 lastIndexOf(element, [indexToStartSearch)=========================*/
// 如 lastIndexOf(2, -3);

/*=========================15. 条件查找  find(function/expression)=========================*/
lessons = [{name: 'js'}, {name: 'C++'}, {name: 'Java'}];
// 查找对象时不能使用includes！！！
console.log(lessons.includes({name: 'C++'})); //  false!
console.log(lessons.find(function(item) {
  return item.name === 'C++';
})); //  { name: 'C++' }
console.log('==================================================');
/* 实现 */
function find(array, callback) {
  for (const value of array) {
    if (callback(value)) {
      return true;
    }
  }
  return false;
}

Array.prototype.findIt = function(callback) {
  for (const value of this) {
    if (callback(value)) {
      return true;
    }
  }
  return false;
}

/*=========================15. 条件查找  findIndex(function/expression)=========================*/
lessons = [{name: 'js'}, {name: 'C++'}, {name: 'Java'}];
console.log(lessons.findIndex(function(item) {
  return item.name === 'C++';
})); //  1
console.log('==================================================');

/*=========================15. 通过索引删除 splice(pos, num)=========================*/
// 返回被删除的元素组成的数组

/*=========================15. 通过索引替换/增加 splice(pos, num, [items to replace or add])=========================*/
arr = [1, 2, 3, 4];
arr.splice(1, 1, 's'); //  [1, 's', 3, 4]
console.log(arr);
arr.splice(4, 0, 'a', 'b', 'c'); // [1, 's', 3, 4, 'a', 'b', 'c']
console.log(arr);
console.log('==================================================');

/*=========================15. 清空数组=========================*/
arr = [1, 877, 9, 10];
arr.splice(0);
arr = [];
arr.length = 0;

/*=========================15. 排序 sort=========================*/
arr = [6, 9, 2, 0];
arr = arr.sort(function(a, b) {
  // -1从小到大  1从大到小
  // a-b从小到大 b-a从大到小
  return a - b;
});
console.log(arr);
/* 实现 */
function sort(array, callback) {
  for (const n in array) {
    for (const m in array) {
      if (callback(array[n], array[m]) < 0) {
        const temp = array[n];
        array[n] = array[m];
        array[m] = temp;
      }
    }
  }
  return array;
}
function optimizedSort(array, callback) {
  for (let i = 0; i < array.length; i++) {
    for (let j = i; j < array.length; j++) {
      if (callback(array[i], array[j]) > 0) {
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    }
  }
  return array;
}
console.log(sort([5, 9, 0, 7], function(a, b) {
  return a - b;
}));
console.log(optimizedSort([5, 9, 0, 7], function(a, b) {
  return a - b;
}));
console.log('==================================================');

/*=========================16. 浅拷贝数组 slice()=========================*/
//  对象只复制引用，String, Number & Boolean复制值
//  拷贝后其中一个数组的变化不会影响另一个数组
