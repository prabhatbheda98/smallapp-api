const mongoose = require("mongoose");


const employeeschema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    class:{
        type:Number,
        required:true
    },
    scname:{
        type:String,
        required:true
    },

})
const employee = new mongoose.model("employee",employeeschema);
module.exports =employee;

