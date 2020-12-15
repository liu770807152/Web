let adder = function() {
  let _args = Array.prototype.slice.call(arguments);
  console.log("line 3 ~ add ~ arguments", arguments);
  console.log("line 3 ~ add ~ _args", _args);

  let _addNum = function() {
    _args.push(...arguments);
    // console.log("line 7 ~ add ~ arg", ...arguments)
    // console.log("line 7 ~ add ~ _args", _args)
    return _addNum;
  }

  _addNum.toString = function() {
    return _args.reduce((a, b) => {
      return a + b;
    }, 0);
  }

  return _addNum;
}
console.log(adder(3,5)(2)(10,0)());


let adder2 = function(...nums) {
  let _args = nums;
  console.log("line 3 ~ add ~ nums", nums);
  console.log("line 3 ~ add ~ _args", _args);

  let _addNum = function(...x) {
    _args = _args.concat(x);
    // console.log("line 7 ~ add ~ x", x)
    // console.log("line 7 ~ add ~ _args", _args)
    return _addNum;
  }

  _addNum.toString = function() {
    return _args.reduce((a, b) => {
      return a + b;
    }, 0);
  }

  return _addNum;
}
console.log(adder2(3,5)(2)(10,0)());

let adder3 = function(...nums) {
  function add(x) {
    let sum = 0;
    x.forEach(x => {
      sum += x;
    });
    return sum;
  }

  let _result = add(nums);
  console.log("line 55 ~ adder3 ~ _result", _result);

  let _addNum = function(...x) {
    _result += add(x);
    console.log("line 58 ~ adder3 ~ _result", _result);
    return _addNum;
  }

  _addNum.toString = function() {
    return _result;
  }

  return _addNum;
}
console.log(adder3(3,5)(2)(10,0)());