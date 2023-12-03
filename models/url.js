const mongoose=require('mongoose');

const urlSchema=new mongoose.Schema({
    shortId:{
        type:String,
        require:true,
        unique:true,
    }
    ,
    redirectURL:{
        type:String,
        require:true,
    
    }
    ,
    visitHistory:[{timestamp:{type:Number}}],

},{timestamps:true});

const URL= mongoose.model('url',urlSchema);

module.exports= URL;


//schema-->in model-->CURD operation.
// model take 2 para. collection_name and schema.