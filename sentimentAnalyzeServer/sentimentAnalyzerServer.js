const express = require("express");
const dotenv = require("dotenv");
const app = new express();

dotenv.config();
function getNLUInstance() {
    const api_key = process.env.API_KEY;
    const api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require("ibm-watson/natural-language-understanding/v1");
    const { IamAuthenticator } = require("ibm-watson/auth");

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: "2020-08-01",
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    });
    return naturalLanguageUnderstanding;
}

app.use(express.static("client"));

const cors_app = require("cors");
app.use(cors_app());

app.get("/", (req, res) => {
    res.render("index.html");
});

app.get("/url/emotion", (req, res) => {
    return res.send({ happy: "90", sad: "10" });
});

app.get("/url/sentiment", (req, res) => {
    return res.send("url sentiment for " + req.query.url);
});

app.get("/text/emotion", (req, res) => {
    return res.send({ happy: "10", sad: "90" });
});

app.get("/text/sentiment", (req, res) => {
    return res.send("text sentiment for " + req.query.text);
});

// let server = app.listen(process.env.PORT || 5555, () => {
//     console.log("Listening", server.address().port);
// });

let server = app.listen(8080 || 3000, () => {
    console.log("Listening on port", server.address().port);
});
