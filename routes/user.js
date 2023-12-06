const express=require('express');
const {handleUserLogin,handleUserSignup}= require('../controller/user.js');

const router=express.Router();

router.post("/",handleUserSignup);
router.post("/login",handleUserLogin);

module.exports=router;