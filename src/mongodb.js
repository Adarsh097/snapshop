const mongooose = require("mongoose");

mongooose.connect("mongodb://127.0.0.1:27017/login")
.then(()=>{
    console.log(`mongodb connected`);
})
.catch(()=>{
    console.log("failed to connect");
})

const loginSchema = new mongooose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
    }
})

const collection = new mongooose.model("Collection1",loginSchema)

module.exports = collection;