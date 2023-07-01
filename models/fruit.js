const mongoose = require('./connection')
const { Schema, model } = require('./connection')

const fruitsSchema = new Schema({
    name: String,
    color: String,
    readyToEat: Boolean,
    username: String
})

const Fruit = mongoose.model('fruit', fruitsSchema)

module.exports = Fruit;