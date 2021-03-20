const { appStart, timestamp } = require('./timestamp');

appStart();

setTimeout(() => {
  timestamp();
}, 3000);


// common.js module
// ecmascript module (import)

//一般不用new Date()直接打印时间, 而是用别的lib, 比如
// new Date().toLocaleTimeString()