const { getemployee,createemployee,updateemployee} = require("../controller/employee");

const router =require("express").Router();

router.get("/", getemployee);

router.post("/",createemployee);

router.put("/:id",updateemployee);


module.exports=router;