function myIterator(arr) {
	let nextIndex = 0;
	return {
		next() {
			/*
			*  {
			*   value: ?,
			*   done: ?
			*  }
			*/
			return nextIndex < arr.length ? { value: arr[nextIndex++], done: false } : { value: undefined, done: true };
		}
	}
}

const iterator = myIterator([1, 2, 3]);
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

/* standard generator behaviours */
function* generator(arr = [1, 2, 3, 4]) {
	for (let value of arr) {
		yield value;
	}
}

const iterator2 = generator();
console.log(iterator2.next()); //  ->  {value: 1, done: false}
// 也可以给迭代器传递值
console.log(iterator2.next(1).value); //  ->  2
// 也可以提前结束迭代器的迭代
console.log(iterator2.return(2).value); //  ->  2
console.log(iterator2.next()); //  ->  { value: undefined, done: true }
