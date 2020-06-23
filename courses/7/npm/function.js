// (function (exports, require, module, __filename, __dirname) {
const appStart = require("./timestamp");
console.log(__filename, __dirname);
appStart();
setTimeout(() => {
  timestamp();
}, 1000);
// })