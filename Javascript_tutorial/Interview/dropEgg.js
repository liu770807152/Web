/**
 * https://www.bilibili.com/video/BV1Jb4y1k7kS
 * Drop 2 eggs from a building to get which floor is the highest floor that the dropped egg won't be broken.
 * Calculate the minimum of operation times to get the result.
 * @param {number} n total number of floors
 * @returns the minimum of operation times to know the highest floor where dropped eggs won't be broken 
 */
const twoEggDrop = n => {
	const table = new Array(2).fill(0).map(() => {
		return Array(n + 1).fill(Infinity);
	});
	// If you only have 1 egg, you can drop it from ground floor to the highest floor.
	for (let i = 1; i <= n; i++) {
		table[0][i] = i;
	}
	// Base case for 2 eggs.
	table[1][0] = 0;
	table[1][1] = 1;

	for (let i = 0; i <= n; i++) {
		for (let j = 1; j <= i; j++) {
			// 本次计算的值与之前不同J层的测试结果进行比较，选择最小的
			table[1][i] = Math.min(Math.max(table[0][j - 1], table[1][i - j]) + 1, table[1][i])
		}
	}
	return table[1][n];
}

console.log(twoEggDrop(100));