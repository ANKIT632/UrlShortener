const express=require('express');
const URL=require('../models/url.js');

const route=express.Router();

route.get("/",async(req,res)=>{
    const allurls=await URL.find({});
    return res.render('home',{
        urls:allurls,
    });
});

module.exports=route;