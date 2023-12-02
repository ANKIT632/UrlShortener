const express=require('express');
const {handleGenerateNewShortURL}=require('../controller/url.js');

const router=express.Router();

router.post('/',handleGenerateNewShortURL);

module.exports=router;