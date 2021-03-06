const mongoose = require('mongoose');
const crypto = require('crypto');

// const SensesSchema = mongoose.Schema({
//     vision: {
//         time: {
//             type: Date,
//             default: Date.now
//         },
//         type: Number,
//         min: 1,
//         max: 100
//     },
//     hearing: {
//         type: Number,
//         min: 1,
//         max: 100
//     },
//     smell: {
//         type: Number,
//         min: 1,
//         max: 100
//     },
//     touch: {
//         type: Number,
//         min: 1,
//         max: 100
//     },
//     taste: {
//         type: Number,
//         min: 1,
//         max: 100
//     },
// })

const ActiveEmotionSchema = mongoose.Schema({
    value: {
        type: String,
        default: "None"
    },
    date: {
        type: Date,
        default: Date.now
    },
})

const SkillsSchema = mongoose.Schema({
    emotion: ActiveEmotionSchema,
})

const UsersSchema = mongoose.Schema({
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
    salt: {
        type: String
    },
    dominantHalf: {
        type: String
    },
    skills: SkillsSchema
});

UsersSchema.methods.setPassword = function (password) {

    // Creating a unique salt for a particular user 
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = crypto.pbkdf2Sync(password, this.salt,
        1000, 64, `sha512`).toString(`hex`);
};


UsersSchema.methods.validPassword = function (password) {
    const hash = crypto.pbkdf2Sync(password,
        this.salt, 1000, 64, `sha512`).toString(`hex`);
    return this.password === hash;
};

module.exports = mongoose.model('Users', UsersSchema);