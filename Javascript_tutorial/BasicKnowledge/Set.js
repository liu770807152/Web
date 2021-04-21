/* ==============================Set=================================== */
// 1. create
let set1 = new Set(['extra-curriculum', 'final-fantasy']);
// Set(2) { 'extra-curriculum', 'final-fantasy' } 
let set2 = new Set('extra-curriculum', 'final-fantasy');
// Set(11) { 'e', 'x', 't', 'r', 'a', '-', 'c', 'u', 'i', 'l', 'm' }
console.log(set1, set2);

// 2. add
set1.add(1);
set1.add('1');

// 3. delete
// 成功返回true，失败返回false
console.log(set2.delete('e')); // true
set2.clear();

// 4. search
console.log(set2.size);
console.log(set2.has('e'));
console.log(set2.values());

// 5. iterate
for (const value of set2) {}

// 6. Union Intersection Difference
let a = new Set([1, 2, 3, 4, 5]);
let b = new Set([4, 5, 2, 9]);
// Union
console.log(new Set([...a, ...b]));
// Intersection
console.log(new Set([...a].filter(function(item) {
  return b.has(item);
})));
// Difference
console.log(new Set([...a].filter(function(item) {
  return !b.has(item);
})));

// 7. transform type
set1 = new Set([1, 2, 3]);
console.log(Array.from(set1));
console.log([...set1]);

/* 把大于5的移除 */
set1 = new Set('123456789');
set1 = new Set([...set1].filter((item) => item < 5));
console.log(set1);
	
/* 数组去重 */
let arr = [1, 1, 4, 2, 3, 2, 5];
arr = [...new Set(arr)];
console.log(arr);

/* ==============================WeakSet=================================== */
// 必须是引用类型！
// let set3 = new WeakMap(['a', 'b']); // TypeError: Invalid value used in weak set
let set3 = new WeakSet();
set3.add(['a', 'b']);  // Valid

/** 键是弱引用，意思是引用指向的对象再内存中的引用计数不增加。
  * 一般情况下，多个引用指向同一个对象时，对象中的引用计数会随之增加。
  * 没有引用指向该对象时，引用计数为0，此时对象成为垃圾，等待回收。
  * 然而通过WeakSet指向某对象的引用不会增加该对象的引用计数！ */
a = { name: 'a' }; // 引用计数变为1
b = a; // 引用计数变为2
set3.add(a);
a = null; // 引用计数减为1
b = null; // 引用计数减为0，等待回收
console.log(set3); // 无法访问对象了

/** 如果对象在WeakSet外部被回收了，在Set内部的对象也会被一起回收。
  * 由于该特性，WeakSet的values() & entries() & size都不准确，都不允许使用！！！
  * for (const iterator of set) {}也不允许使用。  */