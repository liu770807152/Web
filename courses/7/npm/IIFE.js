const imports = {};
const msg = "this is a public msg";
(function (exp) {
  const msg = "this is my secret msg";

  function getMsg() {
    return msg;
  }

  exp.getMsg = getMsg;
})(imports);

console.log(imports.getMsg());

(function () {})();