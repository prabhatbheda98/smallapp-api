const express = require("express");
require("dotenv").config();
require("./db/conn"); 
const routes =require("./routes")
const app = express();
var cors = require('cors')

const port= process.env.PORT  || 2500;
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const errorHandle =require("./lib/errorHandle")


app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(bodyParser.json())
app.use(express.json())
app.use(cors())
app.use(express.urlencoded())
app.use("/",routes)
app.use(errorHandle)

app.listen(port,()=>{
        console.log(`connection is setup at ${port}`);
})  