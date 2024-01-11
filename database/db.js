// const { MongoClient } = require("mongodb")

const mongoose = require("mongoose")

const uri = "mongodb+srv://testUser:testuser@cluster0.hk79mx6.mongodb.net/?retryWrites=true&w=majority"
const connect = async () => {
    try {
        await mongoose.connect(uri)
        console.log("database is succesfully connnected")
    } catch (err) {
        console.log("there is an error connecting to your database");
        console.log(err);
    }
}

module.exports = connect