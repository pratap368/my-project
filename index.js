const bodyParser = require('body-parser');
const express=require('express');
const app=express();
const mongoose=require("mongoose")
app.use(bodyParser.json())

mongoose.connect('mongodb://admin:livoncomfort@34.47.178.182:27017/test?authSource=admin');

const tableschema=new mongoose.Schema({
    name:String,
    age:Number,
    email:String
});
const user=mongoose.model("user",tableschema);

app.post("/adddata",async (req,res)=>{
    const User= new user(req.body);
    try{
        await User.save();
        res.send("User added successfully!");
    }catch(error){
        res.send("failed")
    }
})
app.get("/getdata",async (req,res)=>{
    const item= await user.find();
    res.send(item);

})
app.patch("/updatedata",async (req,res)=>{
    const item=await user.findByIdAndUpdate(req.query.id,req.body,{new:true});
    res.send(item);
})
app.delete("/deletedata",async (req,res)=>{
    const item=await user.findByIdAndDelete(req.query.id);
    res.send(item);
})
const PORT =5000;
app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`);
})