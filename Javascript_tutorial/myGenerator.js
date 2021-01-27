function myGenerator(arr) {
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

const iterator = myGenerator([1, 2, 3]);

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());