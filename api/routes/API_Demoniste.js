var express = require('express');
var router = express.Router();
require('dotenv').config();
const translate = require('translate');
const translateFR = require('translate');
const puppeteer = require('puppeteer');


function processText(inputText) {
    var output = [];
    var json = inputText.split(' ');
    json.forEach(function (item) {
        output.push(item.replace(/\'/g, '').split(/(\d+)/).filter(Boolean));
    });
    return output;
}

async function scrap() {
    const brower = await puppeteer.launch({
        headless: true
    });
    const page = await brower.newPage();
    await page.goto("https://lost-ark.maxroll.gg/build-guides/demonic-impulse-shadowhunter-raid-guide");
    const tables = await page.evaluate(async () => {
        let data = {
            "skills": {
                "name": [],
                "level":[],
            },
            "gameplayEn": [],
            "stats": [],
            "Engravings": {
                "Starter": [],
                "Endgame": [],
                "Advanced": [],
            },
            "Gear Sets": {
                "Tier1": [],
                "Tier2": [],
                "Tier3": [],
            },
            "Runes": {
                "Skills": [],
                "Runes": [],
            },
            "Gems": {
                "Attacks": [],
                "Cooldown": [],
            },
            "Card Sets": {
                "Budget Card": {
                    "Card": [],
                    "Effect": [],
                },
                "Optimal Damage Card": {
                    "Card": [],
                    "Effect": [],
                },
            },
            "Error":[]
        };

        try {
            document.querySelector("#advgb-col-a2526fce-a0c3-4cc8-a21c-f16383fe89c2 > div > figure > div > div > div > div > div > div.lap-body > div.lap-skills").textContent.split(/(\d+)/).forEach(element => {
                if (element.length > 0) {
                    if (!element.match(/(\d+)/)) {
                        data['skills']['name'].push(element)
                    } else {
                        data['skills']['level'].push(element)
                    }
                }
            });
            document.querySelector("#ftwp-postcontent > ul:nth-child(24)").innerText.split("\n").forEach(element => {
                data['gameplayEn'].push(element);
            });
            document.querySelector("#ftwp-postcontent > p:nth-child(30)").innerText.split("\n").forEach(element => {
                data["stats"].push(element);
            });
            document.querySelector("#ftwp-postcontent > ul:nth-child(31)").innerText.split("\n").forEach(element => {
                data["stats"].push(element);
            });
            document.querySelector("#ftwp-postcontent > p:nth-child(32)").innerText.replace(" \n", "\n").split("\n").forEach(element => {
                data["stats"].push(element);
            });
            document.querySelector("#ftwp-postcontent > ul:nth-child(40)").innerText.split("\n").forEach(element => {
                data["Engravings"]["Starter"].push(element);
            });
            document.querySelector("#ftwp-postcontent > ul:nth-child(42)").innerText.split("\n").forEach(element => {
                data["Engravings"]["Endgame"].push(element);
            });
            document.querySelector("#ftwp-postcontent > ul:nth-child(45)").innerText.split("\n").forEach(element => {
                data["Engravings"]["Advanced"].push(element);
            });
            document.querySelector("#advgb-cols-9901f6c9-e6a1-493b-8b7a-5d237a4043a8 > div > div").textContent.replace(/^\s+|\s+$/gm, ',').split(",").forEach(element => {
                if (element.length > 0) {
                    data["Gear Sets"]["Tier1"].push(element); 
                }
            });
            document.querySelector("#advgb-cols-403265ae-2b09-4bd9-a713-343f18d43b1c > div > div").textContent.replace(/^\s+|\s+$/gm, ',').split(",").forEach(element => {
                if (element.length > 0) {
                    data["Gear Sets"]["Tier2"].push(element);
                }
            });
            document.querySelector("#advgb-cols-746ee974-5fdd-444e-af4c-db20e6e31753 > div > div").textContent.replace(/^\s+|\s+$/gm, ',').split(",").forEach(element => {
                if (element.length > 0) {
                    data["Gear Sets"]["Tier3"].push(element);
                }
            });
            document.querySelector("#advgb-col-eeb17e9e-2d0d-45d3-9961-f0b7a571195c > div > table > tbody").innerText.replace(/^\s+|\s+$/gm, '/').replace('\t', '\n').split("\n").forEach((element, index) => {
                if (index >= 2) {
                    if (index % 2 == 0) {
                        data["Runes"]["Skills"].push(element.replace('/', ''));
    
                    } else {
                        data["Runes"]["Runes"].push(element.replaceAll('//',' / '));
                    }
                }
            });
            data['Gems']['Attacks'].push(document.querySelector("#advgb-col-c0cbd474-146a-43e0-a2b7-34fe910ec593 > div > p > span > span > span.lap-skill-name").innerText);
            data['Gems']['Cooldown'].push(document.querySelector("#advgb-col-15c1bdd2-c5fd-4727-b4c9-0fc16de1c9bf > div > p > span > span > span.lap-skill-name").innerText);
            
            document.querySelector("#ftwp-postcontent > figure:nth-child(78) > div > div > div > div").innerText.split("\n").forEach((element, index) => {
                if (index <=5) {
                    data["Card Sets"]["Budget Card"]["Card"].push(element);
                }
                else {
                    data["Card Sets"]["Budget Card"]["Effect"].push(element);
                }
            });
            document.querySelector("#ftwp-postcontent > figure:nth-child(80) > div > div > div > div").innerText.split("\n").forEach((element, index) => {
                if (index <=5) {
                    data["Card Sets"]["Optimal Damage Card"]["Card"].push(element);
                }
                else {
                    data["Card Sets"]["Optimal Damage Card"]["Effect"].push(element);
                }
            });
        } catch (error) {
            console.log(error);
            data.Error.push(error.message)
        }
        return data;
    });
    await brower.close();
    return tables;
}

/* GET home page. */
router.get('/', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    scrap().then((result) => {
        res.json(
            result
        )
    });
});

module.exports = router;