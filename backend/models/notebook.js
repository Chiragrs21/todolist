const mongoose = require('mongoose')

const { Schema } = mongoose;

const Notebookschema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true

    },
    Description: {
        type: String,
        required: true
    },
    Tag: {
        type: String,
        default: 'General'
    },
    Date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Notes', Notebookschema)