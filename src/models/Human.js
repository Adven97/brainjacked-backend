const mongoose = require('mongoose');
const crypto = require('crypto');


const HumanSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    chip_code: {
        type: String,
        unique: true,
        required: true,
        dropDups: true
    },
    password: {
        type: String,
        required: true
    },

});

module.exports = mongoose.model('Humans', HumanSchema);