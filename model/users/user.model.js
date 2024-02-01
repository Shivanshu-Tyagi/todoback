const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : [true , "Email already exists"]
    },
    phone : {
        type : Number,
        required : true,
        unique : [true , "Phone number already exists"],
        minlength : 10,
        maxlength : 10
    },
    password : {
        type : String,
        required : true,
        // select : false,
         minlength : 6,
        // maxlength : 20
    }
})

const user = mongoose.model("user" , userSchema);

module.exports = user;