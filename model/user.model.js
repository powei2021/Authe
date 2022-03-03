const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        type: String,
        trim: true.valueOf,
        required: true,
    },
    
    lastname: {
        type: String,
        trim: true.valueOf,
        required: true,
    },

    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },

    password : {
        type: String,
        trim: true,
        required: true,
    },
    phone: Number,
    address: String,
},{
    timestamps:true
});

module.exports = mongoose.model('user', userSchema);