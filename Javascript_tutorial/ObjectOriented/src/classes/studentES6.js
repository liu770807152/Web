import { People } from './peopleES6';

class Student extends People {
  constructor(name, height, weight, SID, subject) {
    super(name, height, weight);
    this.SID = SID;
    this.subject = subject;
  }

  study() {
    console.log(`My student ID is ${this.SID}. I\'m studying ${this.subject}.`);
  }
}