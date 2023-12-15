const express = require('express');
const urlrouter = require('./routes/url.js');
const staticRouter = require('./routes/staticRoute.js');
const userRoute=require('./routes/user.js');
const path=require('path');
const { connectToMongoDB } = require('./connection.js');

const URL = require('./models/url.js');
const { checkForAuthentication, restrictTo} = require("./middlewares/auth");
var cookieParser = require('cookie-parser')

const PORT = 3000;
const app = express();

// connect db 
connectToMongoDB("mongodb://0.0.0.0:27017/short-url").then(() => console.log("DB connect")).catch(err => {
    console.error('Error connecting to mongo', err)
});

app.set("view engine","ejs"); 
app.set("views",path.resolve("./views"));

//parse date
app.use(express.json()); 
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use(checkForAuthentication) // check auth everytime.

// applymiddleware only /url path ,all /url come througth middleware.
// check user login or not
app.use('/url',restrictTo(["NORMAL","ADMIN"]),urlrouter);
app.use('/user',userRoute);
// all frontend route are static route.
app.use('/',staticRouter); 

app.get("/test",async(req,res)=>{
  const allUrls=await URL.find({});
  return res.render('home',{
    urls:allUrls,
  });
});

app.get("*",(req,res)=>{
   res.send("enter valid url");
})

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