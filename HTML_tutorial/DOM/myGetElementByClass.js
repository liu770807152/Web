function myGetElementByClass(className, parent) {
  var oParent = parent ? document.getElementById(parent) : document,
      eles = [],
      elements = oParent.getElementsByTagName('*');
  for (var i = 0; i < elements.length; i++) {
    if (elements[i].className == className) {
      eles.push(elements[i]);
    }
  }
  return eles;
}

export default myGetElementByClass;