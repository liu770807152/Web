const obj = {};

(function (myObject, __filename, __dirname) {
  let startTime;

  function appStart() {
    startTime = new Date();
    console.log('app started');
  }

  function timestamp() {
    console.log(`${new Date() - startTime} ms passed`);
  }
  // myObject.timestamp = timestamp;
  myObject.appStart = appStart;
})(obj,filename,dirname);

obj.appStart();
obj.timestamp();


// 演示import/exports的原理: 利用IIFE不污染命名空间的特性, 
// 在代码最前面添加以上代码, 从而将其他文件的导出代码引入本文件