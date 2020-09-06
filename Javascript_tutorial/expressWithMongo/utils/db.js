const mongoose = require('mongoose');

exports.connectToDB = () => {
    // 或 { DB_CONNECTION_STRING }
    const { DB_HOST, DB_PORT, DB_DATABASE } = process.env;
    const connectionString = `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;
    const db = mongoose.connection;
    
    db.on('connected', () => {
      console.log('DB connected');
    });
    db.on('error', (error) => {
      console.log('DB connection failed');
      console.error(error.message);
      process.exit(1);
    });
    db.on('disconnected', () => {
      console.log('mongoose connection is disconnected');
    });
  
    mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  };
  