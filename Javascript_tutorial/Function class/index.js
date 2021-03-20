import $ from 'jquery';

var code = `
  let a = 1;
  const b = 2;
  a = a + b;
  console.log(a);
`;

$.ajax({
  url: 'http://localhost:8080/transfer',
  type: 'POST',
  data: {
    code
  },
  success(data) {
    // ES6的let|const 转换成ES5的var
    const fn = Function(data);
    fn();  // -> 3
  }
});