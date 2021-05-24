// 传统解构
let array = [['jiangren'], 'fullstack', 1, 3];
let first = array[0];
let second = array[1];

// nested destructuring
let [[com], ...course] = array;
console.log(com);
console.log(course);

// selected destructuring
let [, , third, forth] = array;
console.log(third);

// ...运算符
let [head, ...tail] = array;
console.log(head);
console.log(tail);

// 解构时设置默认值
let obj = { company: 'jiangren', course: 'fullstack' };
let { company = true } = obj;
console.log(company);

let [something = true] = [];
console.log(something);

// 解构时重命名
let { company: newName } = obj;
console.log(newName);

// 连续解构赋值 + 重命名
obj = { x: {y: 'Mike'}, z: 18 };
const { x: {y: personName}, z: age } = obj;
console.log(personName, age);

// dynamic properties (nested解构+KV Pair取value)
let rando = 'a';
const obj2 = {
  [rando]: 23
};
const { [rando]: randomKey} = obj2;
console.log(rando);  // -> 还是a
console.log(randomKey); // -> 取出了23

// 循环时解构
let users = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
];
for (const { id } of users) {
  console.log(id);
}

// swapping
let a = 1;
let b = 2;
[a, b] = [b, a];
console.log(a, b);

// 正则匹配
let re = /\w+\s/g;
let str = 'fee fi fo fun';
const [fee, fi, fo] = str.match(re);
console.log(fee, fi, fo);

// 缺省参数
function sum(a = 1, b = 2) {
  console.log(a + b);
}


