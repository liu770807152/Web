function flat(array) {
  const isArray = array.some(item => item instanceof Array);
  if (!isArray) {
    return array;
  }
  const res = Array.prototype.concat.apply([], array);
  // const res = [].concat(array)行不通，因为array本身也是[]
  /*
  为什么[] .concat（）和Array.prototype.concat.apply（[],[array]）输出不同?
    [].concat([2,[3,4]])  ->  [2, Array(2)]
    Array.prototype.concat.apply([],[2,[3,4]])  ->  [2, 3, 4]
  
  原因：
  apply语法 -> func.apply(thisArg, [argsArray])
    1. thisArg 在 func 函数运行时使用的 this 值,即当前的执行环境。请注意，this可能不是该方法看到的实际值：
    如果这个函数处于非严格模式下，则指定为 null 或 undefined 时会自动替换为指向全局对象，原始值会被包装。
    2. argsArray 一个数组或者类数组对象，其中的数组元素将作为单独的参数传给 func 函数。如果该参数的值为 null 或  undefined，则表示不需要传入任何参数。
    从ECMAScript5 开始可以使用类数组对象
  所以Array.prototype.concat.apply([],[2,[3,4]])实际上相当于执行了以下代码:
    [].concat(2, [3, 4])
  它们的共同点是执行结果返回一个新的数组，并不会修改原来的数组
  */
  return flat(res);
}

console.log(flat([1, 2, [3, 4, [5]], [[6, 7]], 8, [9, [10]]]));
console.log([].concat(2, [3, 4])); // concat传入参数需要降一维，结果 -> [2, 3, 4]