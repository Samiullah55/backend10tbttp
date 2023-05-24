const mongoose=require("mongoose");

const PlantSchema=new mongoose.Schema({
    plantname:{
        type:String,
        required:true,
    },
    specie:{
        type:String,
        required:true,
    },
    purpose:{
        type:String,
        required:true,
    },
    spacing:{
        type:Double,
        required:true,
    },
    survivalRate:{
        type:Double,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    ownerShip:{
        type:String,
        default:"Community"
    },
    picture:{
        type:Buffer,
        required:true,
    }
});

module.exports=Plant=mongoose.model("plant",PlantSchema);