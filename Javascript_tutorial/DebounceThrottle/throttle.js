/**
 * 节流：允许一个函数在N毫秒内只执行一次。
 * 当我们需要监听滚动条变化，并计算页面中某个元素到窗口顶部的距离时，可以使用节流。
 * 我们不必实时计算元素的位置，而是一段时间计算一次，避免重复执行代码，增加无谓的computing time，拉低性能。
 */

/**
 * 该函数用闭包存储计时器ID。当节流函数被多次连续调用时，单位时间内只有一个计时器在工作。
 * 因为节流函数在计时器完成计时后才执行，所以就实现了节流。
 * This function uses closure to restore the ID of asynchronous timer.
 * When there are multiple frequent calls of func, only the first call within a fixed period will be executed,
 * since the timer will only be created once within that period, 
 * and thus func will only be executed once as well.
 * @param {function} func 
 * @param {number} delay 
 * @returns 
 */
function throttle(func, delay) {
  let timerId;
  return function(...args) {
    let context = this;
    // existing timerID means that the method has not been executed yet
    if (timerID) {
      return;
    }
    timerID = setTimeout(() => {
      // when the method executes, make timerID null
      timerID = null;
      // reminds that apply() will execute func!
      func.apply(context, args);
    }, delay);
  }
}