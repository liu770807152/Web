"use strict";

var fs = require('fs'); // 正常情况下, 应该是异步非阻塞操作, 而不是sync阻塞操作


var content = fs.readFileSync('./text.txt', 'utf-8');
console.log(content);
fs.writeFileSync('./text.txt', 'hello from node.js');