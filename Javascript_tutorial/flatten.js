function flat(array) {
  const isArray = array.some(item => item instanceof Array);
  if (!isArray) {
    return array;
  }
  const res = Array.prototype.concat.apply([], array);
  return flat(res);
}

console.log(flat([1, 2, [3, 4, [5]], [[6, 7]], 8, [9, [10]]]));