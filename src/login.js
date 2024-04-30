const express = require("express");
const app = express();
const path = require("path");
const hbs = require("ejs");
const exp = require("constants");
const collection = require("../src/mongodb")

const templatePath = path.join(__dirname,'../views')



app.use(express.json());
app.set("view engine","ejs");
app.set("views",templatePath);
app.use(express.urlencoded({extended:false}));

app.get("/signin",(req,res)=>{
    res.render("login");
})
app.get("/signup",(req,res)=>{
    res.render("login");
})


app.post("/signup",async(req,res)=>{

    const data ={
        username:req.body.username,
        password:req.body.password,
        email:req.body.email
    }
    await collection.insertMany([data])
    res.render("../templates/home");
})


app.post("/login",async(req,res)=>{
    try{
        const check = await collection.findOne({username:req.body.username});
        if(check.password===req.body.password){
            res.render("home");
        }else{
            // res.alert('wrong password!');
            res.status(400).json({ error: "Wrong password!" });
        }
    }catch(err){
        // res.alert("wrong details!")
        res.status(500).json({ error: "An error occurred!" });
    }
   
})
app.listen(3000,()=>{
    console.log("server is running on port: 3000");
})