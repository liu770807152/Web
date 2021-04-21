/* ==============================对象：键名 只能是 字符串============================== */
let obj = {
  [obj2]: ''
};
console.log(obj[obj2]); // 取不到
console.log(obj[obj2.toString()]); // 取到了
console.log('==========================================');

/* ==============================Map：键名 可以是 任意类型============================== */
// 1. 创建
let map1 = new Map();
let map2 = new Map([[1, 'a'], [2, 'b']]);
// let map3 = new Map([anotherMap]);

// 2. add
// map.set([key], [value]);
// map.set('name', [value]);
// map.set(function(){}, [value]);
// map.set({}, [value]);

// chain supplement
map.set(1, 'a').set(2, 'b');

// 3. delete 成功返回true，失败返回false
// map.delete([key]);
map1.clear();

// 4. search
console.log(map2.get(1));
console.log(map2.has(1));
console.log(map2.keys());
console.log(map2.values());
console.log(map2.entries());
console.log('==========================================');

// 5. iterate
for (const key of map2.keys()) {}
for (const value of map2.values()) {}
for (const [k, v] of map2.entries()) {}
for (const iterator of map2) {
  console.log(iterator); //  [1, 'a'] & [2, 'b']
}
console.log('==========================================');

// 6. transform type
console.log([...map1]); //  [Array(2) -> [1, 'a'], Array(2) -> [2, 'b']]
console.log([...map1.keys()]);
console.log([...map1.values()]);
console.log([...map1.entries()]);
console.log('==========================================');

/* ==============================WeakMap：键名 必须是 对象============================== */
/** 键是弱引用，意思是引用指向的对象再内存中的引用计数不增加。
  * 一般情况下，多个引用指向同一个对象时，对象中的引用计数会随之增加。
  * 没有引用指向该对象时，引用计数为0，此时对象成为垃圾，等待回收。
  * 然而通过WeakMap指向某对象的引用不会增加该对象的引用计数！ */
let obj = { name: 'a' }; // 引用计数变为1
let obj2 = obj; // 引用计数变为2
let map = new WeakMap(); // 创建一个WeakMap，键是该对象
map.set(obj, 'something not important');
obj = null; // 引用计数减为1
obj2 = null; // 引用计数减为0，等待回收
/* 此时WeakMap has no property，1秒后清空 */
console.log(map); //  WeakMap {{…} => 'something not important'}
                  //    [[Entries]] -> No properties
setTimeout(() => {
  console.log(map); //  WeakMap {}
}, 1000);

/** 如果键指向的对象在WeakMap外部被回收了，在Map内部的键名所对应的KV Pair也会被一起回收。
  * 由于该特性，WeakMap的keys() & values() & entries() & size都不准确，都不允许使用！！！ */