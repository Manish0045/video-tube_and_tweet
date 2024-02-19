const mongoose = require('mongoose');
const { DATABASE_NAME } = require('../constants')

console.log(DATABASE_NAME);
const DB_URL = process.env.MONGO_URI + '/' + DATABASE_NAME;


const databaseConnection = () => {
    try {
        const Connection = mongoose.connect(DB_URL, () => {
            console.log('Connecting to database');
        });
        console.log('Connected successfully');
        console.log('Host :', Connection.host);
    } catch (error) {
        console.log("Error while connecting to database...!", error);
        process.exit(1);
    }
}

module.exports = databaseConnection;