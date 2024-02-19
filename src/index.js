require("dotenv").config({ path: "./env" });
const connectDB = require("./DB/dbConfig");
const { app } = require("./app");


const PORT = process.env.PORT || 8000;
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    }).catch((error) => {
        console.log(`Mongo DB connection failed ..!: ${error}`);
    });