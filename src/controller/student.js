const Student = require("../models/student");
const Token = require("../models/token");
const Boom = require("boom")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require("crypto");
const sendEmail = require('./sendmail')
const {OAuth2Client} =require("google-auth-library");
const { response } = require("express");


const client =new OAuth2Client("1028097338125-17p7q25n9a8letb94ro8564hs2h24vdm.apps.googleusercontent.com")

exports.getstudent = async(req, res,next) => {
    try {
        const _id =req.params.id
        const student = await Student.findById({_id});
        return res.send(student)
    } catch (error) {
        console.log(error)
        return next(Boom.badRequest("data not found", error))
    }
}
exports.loginStudent =async(req,res,next) =>{
  try {
      const isStudent =await Student.findOne({email:req.body.email,password:req.body.password});
      if (isStudent) { 
         const token =jwt.sign(
             {   
                 fname :isStudent.fname,
                 lname :isStudent.lname,
                 age:isStudent.age,
                 email:isStudent.email,
             },
             `secert123`
         )
         return res.send({status:"ok",isStudent:{token,id:isStudent._id },message:"user login sucessfully"})
      } else {
        return res.send({message:"user not registeres"})
          
      }

      
  } catch (error) {
      console.log(error)
    return next(Boom.badRequest("data not found", error))
  }
}

exports.createStudent = async (req, res, next) => {
    
    try {
    const isStudent =await Student.findOne({email:req.body.email});
    console.log(isStudent)
    if(isStudent) return next(Boom.badRequest("user aldredy registred"))
        const student = new Student(req.body);
        await student.save();

        return res.send(student);

    } catch (error) {
        return next(Boom.badRequest("data not found", error))
    }
}
exports.googlelogin =(req,res)=>{
    const {tokenId} = req.body;
    
    client.verifyIdToken({tokenId, audience:"1028097338125-17p7q25n9a8letb94ro8564hs2h24vdm.apps.googleusercontent.com"}).
    then(res =>{
      const {email_verfied,name,email} =response.payload;
        if(email_verfied){
            Student.findOne({email}).exec((err,student)=>{
                if(err){
                    return res.json({
                        error:"this studnet doesn't exist,signup first"
                    })

                }else {
                    if(student){
                        const token =jwt.sign(
                            {   
                                fname :isStudent.fname,
                                lname :isStudent.lname,
                                age:isStudent.age,
                                email:isStudent.email,
                            },
                            `secert123`
                        )

                    }
                }

            })
        }else {
            let password =email+process.env.`secert123`;

        }
    })
    console.log()
}

exports.forgotpassword = async(req,res,next)=>{
    try {
        console.log(req.body)

        const student = await Student.findOne({ email: req.body.email });
        if (!student)
            return res.status(400).send("user with given email doesn't exist");

        let token = await Token.findOne({ studentId: student._id });
        if (!token) {
            token = await new Token({
                studentId: student._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }

        const link = `${process.env.CLIENT_URL}/password-reset/${student._id}/${token.token}`;
        await sendEmail(student.email, "Password reset", link);

        return res.send("password reset link sent to your email account");
    } catch (error) {
        console.log(error);
        return res.send("An error occured");
    }
}
 exports.resetPassword =async (req, res) => {
    try {
       
        const student = await Student.findById(req.params.userId);
        if (!student) return res.status(400).send("invalid link or expired");

        const token = await Token.findOne({
            studentId: student._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send("Invalid link or expired");

        student.password = req.body.password;
        await student.save();
        await token.delete();

        res.send("password reset sucessfully.");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
    },
exports.updatestudent = async (req, res,next) => {
    try {   
        const studentId = req.params.id;
        const student = await Student.findByIdAndUpdate(id, req.body);

        res.send("student update successful");
    } catch (error) {
        return next(Boom.badRequest("data not found", error))
    }
}
exports.deletestudent =async (req,res) =>{
    try {
        const id =req.params.id;
        const student =await Student.findByIdAndDelete(id);
        res.send("student data delete")
    } catch (error) {
        return next(Boom.badRequest("data not found", error))
    }
}
