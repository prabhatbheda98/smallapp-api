const router =require("express").Router();
const student = require("./student")
const employee = require("./employee")

router.use("/student", student);
router.use("/employee", employee);

module.exports=router;