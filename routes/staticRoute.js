const express=require('express');
const URL=require('../models/url.js');
const { restrictTo } = require('../middlewares/auth.js');

const route=express.Router();

route.get("/admin/urls",restrictTo(["ADMIN"]),async(req,res)=>{
    const allurls=await URL.find({}); // show all url
  
    return res.render('home',{
        urls:allurls, 

    })});

route.get("/",restrictTo(['NORMAL',"ADMIN"]),async(req,res)=>{
    const allurls=await URL.find({createdBy:req.user?._id}); // show only own url
  
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