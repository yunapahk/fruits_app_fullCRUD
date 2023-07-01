require('dotenv').config();
const mongoose = require('mongoose');

const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL);

mongoose.connection
    .on("open", () => {console.log("Mongo is connected")})
    .on("close", () => {console.log("Mongo is disconnected")})
    .on("error", (error) => {console.log(error)});

module.exports = mongoose