const mongoose = require("mongoose");

const dbConnection = () => {
  // Connect Database
  mongoose.connect(process.env.DB_URL).then((result) => {
    console.log(`Connection Database: ${result.connection.host}`);
  });
};

module.exports = dbConnection;
