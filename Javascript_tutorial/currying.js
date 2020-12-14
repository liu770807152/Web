let adder = function() {
  let _args = Array.prototype.slice.call(arguments);
  console.log("line 3 ~ add ~ arguments", arguments)
  console.log("line 3 ~ add ~ _args", _args)

  let _addNum = function() {
    _args.push(...arguments);
    console.log("line 7 ~ add ~ _args", _args)
    console.log("line 7 ~ add ~ arg", ...arguments)
    return _addNum;
  }

  _addNum.toString = function() {
    return _args.reduce((a, b) => {
      return a + b;
    }, 0);
  }

  return _addNum;
}
console.log(adder(3,5)(2)(10)());


let adder2 = function(...nums) {
  let _args = nums;
  console.log("line 3 ~ add ~ nums", nums)
  console.log("line 3 ~ add ~ _args", _args)

  let _addNum = function(...nums) {
    _args = _args.concat(nums);
    console.log("line 7 ~ add ~ _args", _args)
    console.log("line 7 ~ add ~ nums", nums)
    return _addNum;
  }

  _addNum.toString = function() {
    return _args.reduce((a, b) => {
      return a + b;
    }, 0);
  }

  return _addNum;
}
console.log(adder2(3,5)(2)(10)());