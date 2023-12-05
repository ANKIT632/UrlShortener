const express = require('express');

const urlrouter = require('./routes/url.js');
const staticRouter = require('./routes/staticRoute.js');
const userRoute=require('./routes/user.js');
const { connectToMongoDB } = require('./connection.js');
const path=require('path');
const URL = require('./models/url.js');

const PORT = 8000;
const app = express();

// connect db 
connectToMongoDB("mongodb://0.0.0.0:27017/short-url").then(() => console.log("DB connect")).catch(err => {
    console.error('Error connecting to mongo', err)
});

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

//parse date
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/url', urlrouter);
app.use('/user',userRoute);

// all frontend route are static route.
app.use('/',staticRouter);

app.get("/test",async(req,res)=>{
  const allUrls=await URL.find({});
  return res.render('home',{
    urls:allUrls,
  });
});

app.get("/urls/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      {
        shortId,
      },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now()
          },
        },
      }
    );
    if(entry)
    res.redirect(entry.redirectURL);
   
    else{
      res.json({status:"not valid short Id"})
    }
});

app.listen(PORT, () => {
    console.log('server start at PORT', PORT);
});