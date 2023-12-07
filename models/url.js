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
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
    }

},{timestamps:true});

const URL= mongoose.model('url',urlSchema);

module.exports= URL;


//schema-->in model-->CURD operation.
// model take 2 para. collection_name and schema.
//  type:mongoose.Schema.Types.ObjectId, : it is unique object type.
//  ref:"users" : when get _id from add _id from user collection