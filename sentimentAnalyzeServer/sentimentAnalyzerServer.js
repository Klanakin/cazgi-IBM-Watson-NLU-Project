const express = require("express");
const dotenv = require("dotenv");
const app = new express();

dotenv.config();
function getNLUInstance() {
    const NaturalLanguageUnderstandingV1 = require("ibm-watson/natural-language-understanding/v1");
    const { IamAuthenticator } = require("ibm-watson/auth");

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: "2021-03-25",
        authenticator: new IamAuthenticator({
            apikey: process.env.API_KEY,
        }),
        serviceUrl: process.env.API_URL,
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
    const inputUrl = req.query.url;
    const urlAnalyzeParams = {
        url: inputUrl,
        features: {
            entities: {
                emotion: true,
                sentiment: false,
                limit: 2,
            },
            keywords: {
                emotion: true,
                sentiment: false,
                limit: 2,
            },
        },
    };
    const urlEmotion = getNLUInstance()
        .analyze(urlAnalyzeParams)
        .then((urlAnalysisResults) => {
            console.log(JSON.stringify(urlAnalysisResults, null, 2));
        })
        .catch((err) => {
            console.log("error:", err);
        });

    console.log(urlEmotion);
    return res.send({ happy: "90", sad: "10" });
});

app.get("/url/sentiment", (req, res) => {
    const inputUrl = req.query.url;
    const urlAnalyzeParams = {
        url: inputUrl,
        features: {
            entities: {
                emotion: false,
                sentiment: true,
                limit: 2,
            },
            keywords: {
                emotion: false,
                sentiment: true,
                limit: 2,
            },
        },
    };
    const urlSentiment = getNLUInstance()
        .analyze(urlAnalyzeParams)
        .then((urlAnalysisResults) => {
            console.log(JSON.stringify(urlAnalysisResults, null, 2));
        })
        .catch((err) => {
            console.log("error:", err);
        });

    console.log(urlSentiment);
    return res.send("url sentiment for " + req.query.url);
});

app.get("/text/emotion", (req, res) => {
    const inputText = req.query.text;
    const textAnalyzeParams = {
        text: inputText,
        features: {
            entities: {
                emotion: true,
                sentiment: false,
                limit: 2,
            },
            keywords: {
                emotion: true,
                sentiment: false,
                limit: 2,
            },
        },
    };
    const textEmotion = getNLUInstance()
        .analyze(textAnalyzeParams)
        .then((textAnalysisResults) => {
            console.log(JSON.stringify(textAnalysisResults, null, 2));
        })
        .catch((err) => {
            console.log("error:", err);
        });

    console.log(textEmotion);
    return res.send({ happy: "10", sad: "90" });
});

app.get("/text/sentiment", (req, res) => {
    const inputText = req.query.text;
    const textAnalyzeParams = {
        text: inputText,
        features: {
            entities: {
                emotion: false,
                sentiment: true,
                limit: 2,
            },
            keywords: {
                emotion: false,
                sentiment: true,
                limit: 2,
            },
        },
    };
    const textSentiment = getNLUInstance()
        .analyze(textAnalyzeParams)
        .then((textAnalysisResults) => {
            console.log(JSON.stringify(textAnalysisResults, null, 2));
        })
        .catch((err) => {
            console.log("error:", err);
        });

    console.log(textSentiment);
    return res.send("text sentiment for " + req.query.text);
});

let server = app.listen(process.env.PORT || 8080 || 3000, () => {
    console.log("Listening on port", server.address().port);
});
