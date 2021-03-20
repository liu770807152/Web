function myTypeof(val) {
  var type = typeof(val),
    toStr = Object.prototype.toString;
  var resSet = {
    '[object Object]': 'object',
    '[object Array]': 'array',
    '[object Number]': 'obj_number',
    '[object String]': 'obj_string',
    '[object Boolean]': 'obj_boolean',
    '[object Date]': 'date',
    '[object RegExp]': 'regexp',
  };
  
  if (val === null) {
    return null;
  } else if (type === 'object') {
    var res = toStr.call(val);
    return resSet[res];
  } else {
    return type;
  }
}
