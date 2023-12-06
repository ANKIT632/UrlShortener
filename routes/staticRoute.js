const express=require('express');
const URL=require('../models/url.js');

const route=express.Router();

route.get("/",async(req,res)=>{
    const allurls=await URL.find({createBy:req.user._id});
    return res.render('home',{
        urls:allurls,

    });
});

route.get("/sigup",(req,res)=>{
    return res.render("sigup");
})

route.get("/login",(req,res)=>{
    return res.render("login");
})

module.exports=route;