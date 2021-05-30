/**
 * 我们做搜索功能时，如果每输入一个字符就调用一次接口，请求会过于频繁，增加无谓的网络通信量。
 * 这些请求中，实际上只有最后一次请求是有意义的，前几次请求都是对网络资源的浪费。
 * 因此我们用防抖发方法，把触发频繁的事件合并到最后一次执行。
 */

/**
 * 该函数用闭包存储计时器ID。当防抖函数被多次连续调用时，计时器被多次删除+重新创建，因此只有最后一个计时器能完整执行。
 * 因为防抖函数在计时器完成计时后才执行，所以就实现了防抖。
 * This function uses closure to restore the ID of asynchronous timer.
 * When there are multiple frequent calls of func, only the last call will be executed,
 * since the timer will be re-created for multiple times as well, 
 * and only the last timer can execute the debounce method without interruption.
 * @param {function} func The method that you hope to debounce
 * @param {number} delay The delay time for debounce
 * @returns 
 */
function debounce(func, delay) {
  let timerID;
  return function(...args) {
    let context = this;
    timerID && clearInterval(timerID);
    timerID = setTimeout(() => {
      // reminds that apply() will execute the func!
      func.apply(context, args);
    }, delay);
  }
}

function doSomething() {
  console.log(this);
}

const log = debounce(doSomething, 500);
// simulate frequent calls of "doSomething"
log();
log();
log();