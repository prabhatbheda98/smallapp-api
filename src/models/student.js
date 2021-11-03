const mongoose =require("mongoose");
const validator = require("validator");

const studentschema = new mongoose.Schema({
    fname:{
        type:String,
        required:true,
    },
    lname:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error("invalid email")

            }
        }
    },
    password:{
        type:String
    }
})


const Student = new mongoose.model("student", studentschema);
module.exports=Student;
