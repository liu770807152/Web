function People(name, height, weight) {
  // 对象属性 attributes
  this.name = name;
  this.height = height;
  this.weight = weight;
}

// 对象方法 object methods
People.prototype.intro = function() {
  console.log('I am ' + this.name + '. ' + this.height + 'cm tall. And '
    + this.weight + ' kilograms');
}

People.prototype.eat = function() {
  console.log('I am eating.');
}

People.prototype.sleep = function() {
  console.log('I am sleeping.');
}

People.prototype.drink = function() {
  console.log('I am drinking coffee.');
}

var xiaoming = new People('小明', 175, 70);

xiaoming.intro();
xiaoming.drink();