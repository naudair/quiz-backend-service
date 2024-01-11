const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
    userName: String,
    email: String,
    password: String,
    age: Number,
});


const UserDataBase = model("User", UserSchema);

module.exports = UserDataBase;