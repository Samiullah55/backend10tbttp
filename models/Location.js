const mongoose=require("mongoose");

const LocationSchema=new mongoose.Schema({
    typedLocation:{
        type:String,
        required:true,
    },
    latitude:{
        //must be changed to point or decimal app was crashing due other types
        type:String,
        required:true,
    },
    longitude:{
        type:String,
        required:true,
    }
});

module.exports=Location=mongoose.model("locations",LocationSchema);