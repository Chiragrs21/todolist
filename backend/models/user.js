const mongoose = require('mongoose')

const { Schema } = mongoose;

const Userschema = new Schema({
    name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true,
    },
    Date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('users', Userschema)