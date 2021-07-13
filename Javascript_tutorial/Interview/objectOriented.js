/**
 * 函数相关面试题, 运行环境：现代浏览器
 * new Foo()的执行过程：
 *  var _obj = {};
 *  this指向_obj，然后添加属性，如
 *  {
 *    a: 1,
 *    b: 2,
 *  }
 *  最后return this;
 */
// 构造函数
function Foo() {
    // 全局变量赋值
    // 如果Foo没有执行，下面赋值行为肯定不进行
    getName = function() {
        console.log(1);
    }
    // console.log(this); -> Window
    return this;
}

// 函数Foo上的静态方法 -> 一个函数对象上的方法
Foo.getName = function() {
    console.log(2);
    return this; // this指向实例化的对象，而不是Window！
}

// 扩展函数原型上的方法
Foo.prototype.getName = function() {
    console.log(3);
}

// 给全局变量赋值为一个匿名函数
/**
 * GO {
 *  getName: undefined 
 *           -> function getName() {} (全局预编译结束)
 *           -> function() {console.log(4);} 
 * }
 */
var getName = function() {
    console.log(4);
}

// 函数声明
function getName() {
    console.log(5);
}
/** 问题如下: */
// 执行console.log(Foo())与否是两套题
Foo.getName(); // -> 2, 执行对象Foo上的静态方法

getName(); // -> 4, line 71

Foo().getName(); // -> 1
// Foo() -> this -> Window -> Window.getName
// 这题执行Foo()函数返回值的一个方法getName
// line 44, getName重新赋值给一个新函数，新函数返回1

getName(); // -> 1
// 上一题中getName已经重新赋值了
// Window.getName() -> 1 -> getName() -> 1

new Foo.getName(); // -> 2
// new的是Foo.getName，即Foo的静态方法
// 注意，该题打印结果与第一题一致，然而this指向不同：
//      第一题this显然是Foo()，这题的this则是Foo.getName {}！
//      换言之，这题的new实例化了Foo对象中的一个静态函数

new Foo().getName(); // -> 3
// Step 1. var foo = new Foo()；
// Step 2. foo.getName() -> Foo.prototype.getName()
// 这题的new并没有什么实际意义，因为getName并不是构造函数

new new Foo().getName(); // -> 3
// new Foo()是一个实例化对象，该对象执行原型上的getName()
// 对返回值new没有什么作用，因此打印结果就是new Foo().getName()的结果

new new Foo(); // -> Error, new Foo()返回一个中间值，不是构造器，不能用于构造对象

/*
console.log(Foo());
Foo.getName(); // -> 2, 执行对象Foo上的静态方法

getName(); // -> 

Foo().getName(); // -> 

getName(); // -> 

new Foo.getName(); // -> 2
// new的是Foo.getName，即Foo的静态方法
// 注意，该题打印结果与第一题一致，然而this指向不同：
//      第一题this显然是Foo()，这题的this则是Foo.getName {}！
//      换言之，这题的new实例化了Foo对象中的一个静态函数

new Foo().getName(); // -> 3
// Step 1. var foo = new Foo()；
// Step 2. foo.getName() -> Foo.prototype.getName()
// 这题的new并没有什么实际意义，因为getName并不是构造函数

new new Foo().getName(); // -> 3
// new Foo()是一个实例化对象，该对象执行原型上的getName()
// 对返回值new没有什么作用，因此打印结果就是new Foo().getName()的结果

new new Foo(); // -> Error, new Foo()返回一个中间值，不是构造器，不能用于构造对象
*/