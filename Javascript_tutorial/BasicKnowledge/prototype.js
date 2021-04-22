function User() {}
User.__proto__.view = function() { console.log('b'); }
User.prototype.view = function() { console.log('a'); }
/* Now User has view() in both __proto__ and prototype! */
let user = new User();
/* You can see both __proto__ and prototype */
console.dir(User);
/* The instance of User only calls view() from its prototype! */
user.view(); // a