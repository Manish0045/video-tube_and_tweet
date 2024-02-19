require('dotenv').config({ path: './env' });
const connectDB = require('./DB/dbConfig');

connectDB();
console.log("Started");