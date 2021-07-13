/** 特殊值相关问题 */
console.log(({} + {}).length); // 30, why?
console.log(([] + []).length); // 0, why?
console.log((function(){}).length); // 0, why?
console.log([] == []); //false, why?