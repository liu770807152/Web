const PENDING = 'PENDING', FULFILLED = 'FULFILLED', REJECTED = 'REJECTED';

class MyPromise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.onFulfilledCallbacks.forEach((fn) => fn()); // 发布
      }
    };
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach((fn) => fn()); // 发布
      }
    };
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onFulfilled, onRejected) {
    // 解决Promise().then().then().then((resolve, reject) => {}) 链式处理中的参数穿透问题
    // onFulfilled和onRejected都是可选参数，因此可能为空
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => this.value;
    onRejected =
      typeof onRejected === "function" ? onRejected : (reason) => { throw this.reason };

    let promise2 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        // resolvePromise()在try..catch代码块非异步的情况下，不可能在promise2创建完成前传入promise2
        // 因此我们需要在try..catch外部包一层setTimeout设置为异步
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0); // 即使设为0，也需要4ms
      } else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      } else if (this.status === PENDING) { // 订阅
        // 订阅时只存储promise2，不执行，因此不需要setTimeout
        this.onFulfilledCallbacks.push(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
        this.onRejectedCallbacks.push(() => {
          try {
            let x = onFulfilled(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }
    });
    return promise2;
  }
  // catch在源码层面上就是then的语法糖
  catch(errorCallback) {
    return this.then(null, errorCallback);
  }
}
// 对于Promise的所有处理，都交给resolvePromise()实现
function resolvePromise(promise2, x, resolve, reject) {
  // 规范2.3.1
  if (promise2 === x) {
    return reject(
      new TypeError("Chaining cycle detected for promise #<Promise>")
    );
  }
  let called = false; // 防止Promise状态改变
  // 规范2.3.2
  if ((typeof x === "object" && x !== null) || typeof x === "function") {
    // x至少是一个对象，可能是一个Promise
    try {
      // 防止x被拦截
      let then = x.then;
      if (typeof then === "function") {
        // 如果x.then是一个函数，就可以认定x是个Promise对象，因为不能检查地更细致了
        // 根据规范，把this指向x
        then.call(
          x,
          (y) => {
            if (called) {
              return;
            }
            called = true;
            resolvePromise(promise2, y, resolve, reject); // 递归地处理
          },
          (r) => {
            if (called) {
              return;
            }
            called = true;
            reject(r); // 失败了就不用递归处理Promise了
          }
        );
      } else {
        // x.then不是函数，x就不是Promise
        resolve(x);
      }
    } catch (e) {
      if (called) {
        return;
      }
      called = true;
      reject(e);
    }
  } else {
    // x是一个普通值，不是Promise
    resolve(x);
  }
}

/**
 测试以下几种情况：
 1. MyPromise.resolve()
 2. 字符串
 3. Error
 4. 链式.then()
 5. setTimeout()嵌套MyPromise
 6. pending的Promise中止then()链条
 */
let promise1 = new MyPromise((resolve, reject) => {
  resolve('Promise1');
});
promise1.then((value) => {
  // return new Error('Error');
  return Promise.resolve(value + ' -> promise2');
  // return "A string";
  // return new MyPromise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve(new MyPromise((resolve, reject) => {
  //       resolve('new Promise resolve');
  //     }));
  //   }, 1000);
  // });
}, (reason) => {
  return reason;
}).then().then().then().then((value) => {
  console.log(value);
  // return new MyPromise(() => {});
})
.then((value) => {
  console.dir(value);
})
.catch((e) => {
  console.warn(e);
});

