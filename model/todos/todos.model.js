const { Schema, default: mongoose } = require("mongoose");

const todoSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    }
})

const todo = mongoose.model("todo" , todoSchema);

module.exports = todo