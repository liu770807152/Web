const mysql = require('mysql');

const option = {
  host: 'localhost',
  // port: '3306',
  user: 'root',
  password: '123456',
  // database: 'demo'
  database: 'user'
};

/* establish connect */
const connection = mysql.createConnection(option);
connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connection success!');
    console.log('=============================================================')
  }
});

/* Read */
// connection.query('SELECT * FROM STUDENT', function(error, results, fields) {
//   if (error) {
//     throw error;
//   }
//   console.log('The result is: ', results);
//   // console.log('The fields is: ', fields);
// });

/* Create a new table */
// connection.query('CREATE DATABASE USER', function(error, results, fields) {
//   if (error) {
//     throw error;
//   }
//   console.log('The result is: ', results);
//   // console.log('The fields is: ', fields);
// });

/* Delete a table */
// connection.query('DROP DATABASE USER', function(error, results, fields) {
//   if (error) {
//     throw error;
//   }
//   console.log('The result is: ', results);
//   // console.log('The fields is: ', fields);
// });

/* Create a new table with fields */
// const query1 = 'CREATE TABLE `NewTable` (`id` int NOT NULL AUTO_INCREMENT,`username` varchar(255) NULL,`password` varchar(255) NULL,`mail` varchar(255) NULL,PRIMARY KEY (`id`));'
// connection.query(query1, (error, results, fields) => {
//   if (error)
//     throw error;
//   console.log('The result is: ', results);
// });

/* Update the table with query */
// use '?' to mark unknown data
const query2 = 'INSERT INTO NewTable (id, username, password) VALUES (?, ?, ?, ?)';
// pass in an array to replace '?' in query
connection.query(query2, [1, 'Mary', 'password', 'xxx@gmail.com'], (error, results, fields) => {
  if (error)
    throw error;
  console.log(results);
})