let adder = function() {
  let _args = Array.prototype.slice.call(arguments);

  let _addNum = function() {
    _args.push(...arguments);
    return _addNum;
  }

  _addNum.toString = function() {
    return _args.reduce((a, b) => {
      return a + b;
    }, 0);
  }

  return _addNum;
}
console.log(adder(3,5)(2)(10,0)().toString());


let adder2 = function(...nums) {
  let _args = nums;

  let _addNum = function(...x) {
    // _args = _args.concat(x);
    // _args原地push
    _args.push.apply(_args, x);
    return _addNum;
  }

  _addNum.toString = function() {
    return _args.reduce((a, b) => {
      return a + b;
    }, 0);
  }

  return _addNum;
}
console.log(adder2(3,5)(2)(10,0)().toString());

let adder3 = function(...nums) {
  function add(x) {
    let sum = 0;
    x.forEach(x => {
      sum += x;
    });
    return sum;
  }

  let _result = add(nums);

  let _addNum = function(...x) {
    _result += add(x);
    return _addNum;
  }

  _addNum.toString = function() {
    return _result;
  }

  return _addNum;
}
console.log(adder3(3,5)(2)(10,0)().toString());