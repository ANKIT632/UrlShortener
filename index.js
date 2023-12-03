const express = require('express');
const urlrouter = require('./routes/url.js');
const { connectToMongoDB } = require('./connection.js');
const URL = require('./models/url.js');

const PORT = 8000;
const app = express();

// connect db 
connectToMongoDB("mongodb://0.0.0.0:27017/short-url").then(() => console.log("DB connect")).catch(err => {
    console.error('Error connecting to mongo', err)
});

app.use(express.json());

app.use('/url', urlrouter)

app.get("/:shortId", async (req, res) => {
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