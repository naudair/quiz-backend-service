const { model, Schema } = require('mongoose')

const FactSchema = new Schema({
    date: Date,
    userID: String,
    fact: String,
    title: String,
    likes: [],
    dislikes: []
});


const FactDataBase = model("Fact", FactSchema);

module.exports = FactDataBase;