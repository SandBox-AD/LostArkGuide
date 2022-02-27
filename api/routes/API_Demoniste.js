var express = require('express');
var router = express.Router();
require('dotenv').config();
const translate = require('translate');
const translateFR = require('translate');
const puppeteer = require('puppeteer');

async function scrap() {
    const brower = await puppeteer.launch({
        headless: true
    });
    const page = await brower.newPage();
    await page.goto("https://lost-ark.maxroll.gg/build-guides/demonic-impulse-shadowhunter-raid-guide");
    const tables = await page.evaluate(async () => {
        let data = {
            "skills": [],
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

        };
        try {
            
            document.querySelector("#advgb-col-5a1be502-f5c8-4961-b398-4fbf8a6b29a1 > div > figure > div > div > div > div > div > div.lap-body > div.lap-skills").innerText.split("\n").forEach(element => {
                data['skills'].push(element);
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
            document.querySelector("#ftwp-postcontent > p:nth-child(32)").innerText.split("\n").forEach(element => {
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
            document.querySelector("#advgb-cols-a89fed4a-8f68-48d1-a11b-60a820ac16f7 > div > div").innerText.replace(/^\s+|\s+$/gm, '').split("\n").forEach(element => {
                data["Gear Sets"]["Tier1"].push(element);
            });
            document.querySelector("#advgb-cols-42664f5e-da06-44bb-9587-b7658cddc369 > div > div").innerText.replace(/^\s+|\s+$/gm, '').split("\n").forEach(element => {
                data["Gear Sets"]["Tier2"].push(element);
            });
            document.querySelector("#advgb-cols-3ec18506-2ab0-436b-9a46-0e6cece97f6f > div > div").innerText.replace(/^\s+|\s+$/gm, '').split("\n").forEach(element => {
                data["Gear Sets"]["Tier3"].push(element);
            });
            document.querySelector("#advgb-col-09a8107f-852f-42cf-8bd9-cdeeacea61be > div > table").innerText.replace(/^\s+|\s+$/gm, '').replace('\t', '\n').split("\n").forEach((element, index) => {
                if (index >= 2) {
                    if (index % 2 == 0) {
                        data["Runes"]["Skills"].push(element);
    
                    } else {
                        data["Runes"]["Runes"].push(element);
                    }
                }
            });
            document.querySelector("#advgb-cols-bb1debb1-480b-48ec-b52f-a58a747661cc > div > div").innerText.split("\n").forEach((element, index) => {
                if (index == 2) {
                    data["Gems"]["Attacks"].push(element);
                }
                if (index == 6) {
                    data["Gems"]["Cooldown"].push(element);
                }
            });
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