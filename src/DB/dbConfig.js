const mongoose = require('mongoose');
const { DATABASE_NAME } = require('../constants')


const DB_URL = process.env.MONGO_URI + DATABASE_NAME;


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(DB_URL);
        console.log('Database Connected to mongoDB successfully');
        console.log('Host :', connectionInstance.connection.host, ' Database:', connectionInstance.connection.name);
    } catch (error) {
        console.log("Error while connecting to database...!", error);
        process.exit(1);
    }
}

module.exports = connectDB;