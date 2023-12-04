const shortid=require('shortid');
const URL=require('../models/url.js')

async function handleGenerateNewShortURL(req,res){
    const body=req.body;
    if(!body.url) 
    return res.status(404).json({error:"url is required"});

    const shortID = shortid();
    await URL.create({
        shortId:shortID,
        redirectURL:body.url,
        visitHistory:[], 
    });
    return res.status(201).render("home",{ id: shortID });
}

async function handleGetAnalytics(req,res){
    const shortId=req.params.shortId;
    const result =await URL.findOne({shortId});
  if(result)  return res.json({
        totalClicks:result.visitHistory.length,
        analytics:result.visitHistory,
    });

    else{
        res.json({
            message:"data not found!!"
        })
    }
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
}