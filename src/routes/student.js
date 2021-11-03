const { getstudent, createStudent, updatestudent,googlelogin, deletestudent, loginStudent, resetPassword,forgotpassword } = require("../controller/student");

const router =require("express").Router();

router.get("/", getstudent);

router.post("/register",createStudent);
router.post("/login",loginStudent);
router.get("/userprofile/:id",getstudent);

router.post("/forgotpassword",forgotpassword)

router.post('/googlelogin',googlelogin)

router.post("/resetpassword/:userId/:token",resetPassword)

router.put("/:id",updatestudent);

router.delete("/:id",deletestudent);



module.exports=router;
