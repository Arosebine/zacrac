const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true       
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator : function(v) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message: "Please enter a valid email address"
        }
    },
    address: {
        type: String
    }
},
{
    timestamps: true
})

module.exports = mongoose.model("User", userSchema);