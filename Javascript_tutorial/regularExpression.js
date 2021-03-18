/* =======================1. Match Principle========================== */
// 匹配成功，从成功匹配的子字符串的下个字符开始匹配，能匹配多少就匹配多少（默认贪婪模式）；
// 匹配失败，则从当前字符的下个字符开始匹配

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


var input1 = 'ABCDa2!', input2 = 'Aa21#', input3 = 'aa!';
/* 除\r\n以外的其他字符开头  紧跟6位0~无穷个数字或大写字母或小写字母或特殊符号   除\r\n以外的其他字符结尾 */
var reg = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[~!#$%^&*?]).*$/;

console.log(reg.test(input1));
console.log(reg.test(input2));
console.log(reg.test(input3));