const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
// add support of promise
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const dbPath = path.join(__dirname, './db.json');

exports.getDB = async () => {
  const data = await readFile(dbPath, 'utf8');
  return JSON.parse(data);
}

exports.saveDB = async (db) => {
  // set indentation to double spaces
  const data = JSON.stringify(db, null, '  ');
  await writeFile(dbPath, data);
}