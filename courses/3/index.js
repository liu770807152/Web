/* Quiz1 */
/* 打印0-100中属于4的倍数且不是5的倍数 */
var array = [];
var result = [];
for (let index = 0; index < 101; index++) {
    array.push(index);    
}

for (let index = 0; index < array.length; index++) {
    if (array[index] % 5 && !(array[index] % 4)) {
        result.push(array[index]);
    }
    if (result.length >= 10) {
        break;
    }
}
console.log(result);

/* Quiz2 */
/* 给定一个数组和目标值,写一个函数,
找出数组中所有一对数的和等于这个目标值,返回这些对数的index的list */
function Q2(array, target) {
    var ans = [];
    for (let index = 0; index < array.length; index++) {
        if (array[index] >= target) {
            break;
        }
        for (let i = index+1; i < array.length; i++) {
            if (array[i] + array[index] === target) {
                ans.push([index, i]);
            }
        }
    }
    return ans;
}
function Q2ad(array, target) {
    var ans = [];
    var left = 0;
    var right = array.length - 1;
    while (left < right) {
        if (array[left] + array[right] === target) {
            ans.push([left, right]);
        }
        if (array[left] + array[right] > target) {
            right--;
        } else {
            left++;
        }
    }
    return ans;
}
console.log(Q2([1,3,4,6,7,8,10,14,15], 14));
console.log(Q2ad([1,3,4,6,7,8,10,14,15], 14));


/* Milestone1 */
var sum = 1;
function sum(a, b) {
  if (a + b > 1) {
    return a + b;
  }

  console.log(a + b);
}

console.log(sum);
// 函数声明优先于变量声明
// 变量的赋值要高于函数声明

/* Milestone2 */
var obj = {
    name: "mason",
    printName: function () {
      console.log(this.name); //this只有在实际运行时才知道指代什么
    },
  };
obj.printName();
  
var ob = {
    name: "jack",
};
obj.printName.bind(ob)();
