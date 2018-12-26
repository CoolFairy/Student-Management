var mongoose = require('mongoose')

var Schema = new mongoose.Schema({
    eMail: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('Admin', Schema)