const express = require('express');
const Urlrouter = require('./routes/url.js');
const { connectToMongoDB } = require('./connection.js');
const URL = require('./models/url.js');

const PORT = 8001;
const app = express();


app.use(express.json());

// connect db 
connectToMongoDB("mongodb://0.0.0.0:27017/short-url").then(() => console.log("DB connect"));

app.use('/url', Urlrouter)

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
                }
            }
        }
    )

})

app.listen(PORT, () => {
    console.log('server start at PORT', PORT);
})