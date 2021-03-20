let obj = {
  a: 1,
  b: 2,
  c: {
    d: 3,
    e: [4, 5]
  },
  f: function(x, y) {
    return x + y;
  }
};

// ES3
function shallowCopy(obj) {
	var cloneObj = {};
	for(var item in obj) {
		cloneObj[item] = obj[item];
	}
	return cloneObj;
}
console.log(shallowCopy(obj));
obj.a = 2;
console.log(shallowCopy(obj)); // obj.a is also changed!
obj.a = 1;

// ES6
function shallowCopy2(obj) {
	var cloneObj = {};
	for(var [key, value] of Object.entries(obj)) {
		cloneObj[key] =value;
	}
	return cloneObj;
}
console.log(shallowCopy2(obj));
obj.a = 2;
console.log(shallowCopy2(obj)); // obj.a is also changed!
obj.a = 1;

// ES5(偏底层)
function shallowCopy3(obj) {
	var cloneObj = {};
	Object.getOwnPropertyNames(obj).forEach(key => {
		var des = Object.getOwnPropertyDescriptor(obj, key); // 拿到每个key对应的值的信息
		Object.defineProperty(cloneObj, key, des); // 将拿到的值赋给cloneObj
	});
	return cloneObj;
}
console.log(shallowCopy3(obj));
obj.a = 2;
console.log(shallowCopy3(obj)); // obj.a is also changed!
obj.a = 1;
