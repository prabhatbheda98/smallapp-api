const mongoose =require("mongoose");

mongoose.connect(process.env.DATABASE,{useNewUrlParser :true ,useUnifiedTopology :true})
.then(()=>{
    console.log("connection set up")
}).catch((e)=>{
    console.log("no connetion", e);
})
