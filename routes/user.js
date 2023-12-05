const express=require('express');
const {handleUserSigup}= require('../controller/user.js');

const router=express.Router();

router.post("/",handleUserSigup);

module.exports=router;