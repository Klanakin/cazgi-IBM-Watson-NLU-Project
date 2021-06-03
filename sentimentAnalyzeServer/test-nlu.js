const NaturalLanguageUnderstandingV1 = require("ibm-watson/natural-language-understanding/v1");
const { IamAuthenticator } = require("ibm-watson/auth");
const dotenv = require("dotenv");

dotenv.config();

const analyzeParams = {
    html: "<html><head><title>Fruits</title></head><body><h1>Apples and Oranges</h1><p>I love apples! I don't like oranges.</p></body></html>",
    features: {
        emotion: {
            targets: ["apples", "oranges"],
        },
    },
};

const nlu = getNLUInstance();
nlu.analyze(analyzeParams)
    .then((analysisResults) => {
        // console.log(JSON.stringify(analysisResults, null, 2));
        const results = JSON.stringify(analysisResults, null, 2);
        console.log(results);
    })
    .catch((err) => {
        console.log("error:", err);
    });

function getNLUInstance() {
    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: "2021-03-25",
        authenticator: new IamAuthenticator({
            apikey: process.env.API_KEY,
        }),
        serviceUrl: process.env.API_URL,
    });
    return naturalLanguageUnderstanding;
}
