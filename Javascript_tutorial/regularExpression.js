/* =======================1. Match Principle========================== */
// 匹配成功，从成功匹配的子字符串的下个字符开始匹配，能匹配多少就匹配多少（默认贪婪模式）；
// 匹配失败，则从当前字符的下个字符开始匹配
var str2 = '0987r123';
var reg4 = /([1234567890A-z])[123456789|0][1234567890]/g; // |表逻辑或, ()提高优先级, ^表逻辑非
str2.match(reg4);  // ->  ["098", "r12"], 没有987和123！

/* =======================2. Simple Use========================== */
var str1 = 'This is a test.\nTest is completed.';
/* 用new创建正则对象, 传入gi作为正则属性 */
var reg1 = new RegExp('Test', 'gi'); // ignore case，global match
reg1.test(str1);
str1.match(reg1);
/* 用对象字面量创建正则对象，传入gim作为正则属性 */
var reg2 = /^Test/gim; // multi-line match，每行开头匹配
reg2.exec(str1);
/* reg3和newReg是同一个对象的引用！ */
var reg3 = /test/;
var newReg = RegExp(reg3);
console.log(reg3 === newReg);

/* =======================3. exec()========================== */
// 1. 如果正则表达式是\...\g，最后一次返回null，然后从头再匹配；
//    如果正则表达式没有g，只匹配第一个结果。我们可以通过设置reg.lastIndex这个属性，设置从第几个字符开始匹配
// 2. 如果正则表达式用了反向引用，如/(\w)\1(\w)\2/g，匹配结果除了有当前的类似于xxyy的结果外，还有所有子表达式的值。如：
var reg = /(\w)\1(\w)\2/g,
str = 'aabbcc';
reg.exec(str);
// 3. 对于match()和exec(), 如果正则表达式包含子表达式，则返回结果的类数组中还会捕获子表达式的匹配结果。
//    如果不想捕获某些子表达式的结果，则需要在那些子表达式的开头加上'?:'，如(?:a)(b)(c)的结果就没有"a"

/* =======================4. 面试题========================== */
// 1. 将xxyy变成yyxx
var str = 'aabbccdd';
reg = /(\w)\1(\w)\2/g;
// "bbaaddcc", 用$N拿匹配结果中的第N个子表达式
// 对于"aabb", $1是a，$2是b
str.replace(reg, $2$2$1$1);  

// 同理
str.replace(reg, function($, $1, $2) {
  console.log($, $1, $2);
  // ->  "aabb" "a" "b", 因为有了()，用了子表达式做了分类，才是这个结果
  return $2 + $2 + $1 + $1;
});

// 2.1 将指定单词的首字母大写
var str = 'js-plus-plus';
reg = /-(\w)/g;
str.replace(reg, function($, $1) {
  return $1.toUpperCase();
});
// 2.2 匹配所有整数，包括正数和负数
reg = /([-?]\d+)/g;

// 3 在指定单词前面添加下划线，如大写开头的单词
var str = 'jsPlusPlus';
reg = /(A-Z)/g // 或 /(\W)/g
str.replace(reg, function($, $1) {
  return '_' + $1.toLowerCase();
});

// 4.1 把xxyyzz变成XxYyZz
var str = 'xxyyzz';
reg = /(\w)\1(\w)\2(\w)\3/g
str.replace(reg, function($, $1, $2, $3) {
  return $1.toUpperCase() + $1 + $2.toUpperCase() + $2 + $3.toUpperCase() + $3;
});
// 4.2 把aabbcc变成a$b$c$, 不能使用函数
var str = 'aabbcc';
reg = /(\w)\1(\w)\2(\w)\3/g
// $1$$$2$$$3$$拆解成$1 $$ $2 $$ $3 $$
// 如果要替换成'$', 要在前面再加一个'$'特殊表示，其他符号不用
// 匹配转义字符就在前面加'\', 如'?'、'*'、'+'
str.replace(reg, '$1$$$2$$$3$$');

// 5. 把含有重复字符的字符串去重
var str = 'aaabbcccccccccc';
reg = /(\w)\1*/g
str.replace(reg, '$1');



var input1 = 'ABCDa2!', input2 = 'Aa21#', input3 = 'aa!';
/* 除\r\n以外的其他字符开头  紧跟6位0~无穷个数字或大写字母或小写字母或特殊符号   除\r\n以外的其他字符结尾 */
var reg = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[~!#$%^&*?]).*$/;

console.log(reg.test(input1));
console.log(reg.test(input2));
console.log(reg.test(input3));