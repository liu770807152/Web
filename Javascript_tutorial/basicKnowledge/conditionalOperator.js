let a = 6;
let b = 7;
let c = a > 0 ? ++b + a++ : --a + b;

console.log(c, a, b);