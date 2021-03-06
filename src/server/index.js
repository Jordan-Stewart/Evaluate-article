const path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const cors = require('cors')
const fetch = require('node-fetch')
const bodyParser = require('body-parser')

const dotenv = require('dotenv');
dotenv.config();

const app = express()

console.log(`Your API key is ${process.env.API_KEY}`);

app.use(express.static('dist'))
app.use(cors())
app.use(bodyParser.json())

console.log(__dirname)

// designates what port the app will listen to for incoming requests - instructed by mentor: https://knowledge.udacity.com/questions/642781
app.listen(8081, function () {
    console.log('Example app listening on port 8081')
})

app.get('/clientdataUrl', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile('dist/index.html')
})

//assistance provided for this function from mentor - https://knowledge.udacity.com/questions/641239
app.post("/clientdataUrl", async function (req, res) {
    console.log('req====+>', req.body)
    const result = await fetch("https://api.meaningcloud.com/sentiment-2.1?key=" + process.env.API_KEY + "&url=" + req.body.formText + "&lang=en")
    try {
        console.log(result)
        const response = await result.json();
        res.send(response)
        console.log(response)
    } catch (error) {
        console.log("error", error);
    }
})
