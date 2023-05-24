const express=require("express");
const cors=require("cors");
const server=express();
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const fs=require("fs");
const multer=require("multer");
const path = require('path');
const crypto=require('crypto');
const  generateUploadURL=require('../backend/s3');
const { promisify } = require("util");



server.use(cors());
server.use(bodyParser.urlencoded({extended:false}));
server.use(bodyParser.json());

//error handling
main().catch(err => console.log(err));


//connection to Database
async function main() {
  await mongoose.connect('mongodb+srv://SamiUllah:Sami.Ullah,971@cluster0.k16r5qq.mongodb.net/TenbillionTreeTsunami');
  console.log("Database connected");
  
}



//creating schema for data
const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone: {
      type: Number,
      required: true
    },
    aspect: {
      type: String,
      required: true
    },
    plantname: {
      type: String,
      required: true
    },
    specie: {
      type: String,
      required: true
    },
    purpose: {
      type: String,
      required: true
    },
    spacing: {
      type: Number,
      required: true
    },
    survivalRate: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    ownerShip: {
      type: String,
      default: "Community"
    },
    picture: {
      type:String
    },
    img:{
      data:Buffer,
      contentType:String,
    },
    typedLocation: {
      type: String,
      required: true
    },
    longitude:{
      type:Number,
      required:true
    },
    latitude:{
      type:Number,
      required:true
    },
  });
 

//creating model of the schema for making class from the schema
const User=mongoose.model("User",UserSchema);

const PORT=process.env.PORT || 5000;

server.get('/s3Url',async(req,res)=>{
  const url=await generateUploadURL();
  res.send({url});
  console.log(url);
})

//Crud create operations for user
server.post("/demo" ,async(req,res)=>{
    let user=new User();
    user.name=req.body.name;
    user.email=req.body.email;
    user.phone=req.body.phone;
    user.aspect=req.body.aspect;
    user.plantname=req.body.plantname;
    user.specie=req.body.specie;
    user.purpose=req.body.purpose;
    user.spacing=req.body.spacing;
    user.survivalRate=req.body.survivalRate;
    user.date=req.body.date;
    user.ownerShip=req.body.ownerShip;
    user.typedLocation=req.body.typedLocation;
    user.latitude=req.body.latitude;
    user.longitude=req.body.longitude;
    user.picture=req.body.picture;
    const userdoc=await user.save().then((res)=>{
      console.log(res.body);
      console.log("Data saved successfully");
    }).catch((err)=>console.error(err));
    console.log(userdoc);
    res.json(userdoc);

  });
//crud query for operation
server.get("/demo",async(req,res)=>{
    const userdocs=await User.find({});
    //const locationdocs=await Location.find({});
    res.json(userdocs);
})



//server
server.listen(PORT,()=>{
    console.log(`server Started on port ${PORT}`);
})