class People {
  constructor(name, height, weight) {
    this.name = name;
    this.height = height;
    this.weight = weight;
  }

  intro() {
    console.log('I am ' + this.name + '. ' + this.height + 'cm tall. And '
      + this.weight + ' kilograms');
  }

  eat() {
    console.log('I am eating.');
  }

  sleep() {
    console.log('I am sleeping.');
  }

  drink() {
    console.log('I am drinking coffee.');
  }
}

export { People };