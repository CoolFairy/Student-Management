var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/test')

var Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: Number,
        enum: [0, 1, -1],
        default: 0
    },
    age: Number,
    hobbies: String
})


module.exports = mongoose.model('Stundent', Schema)