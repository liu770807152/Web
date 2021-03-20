let startTime;

function appStart() {
  startTime = new Date();
  console.log('app started');
}

function timestamp() {
  console.log(`${new Date() - startTime} ms passed`);
}

// module.exports = { appStart: appStart, timestamp: timestamp };
module.exports = { appStart, timestamp }; //注意startTime没导出!外部无法访问或修改
// 等同于exports.appStart = appStart;
// 和exports.timestamp = timestamp;
// 注意exports.timestamp = timestamp()意思是立即执行timestamp函数, 导出返回值
// 不能写成exports = { appStart, timestamp }; 因为这样直接修改了exports, 而不是添加属性


// node REPL

// IIFE immediate invoked function expression
(function () { })()
// 原理和// __filename, __dirname, exports = module.exports