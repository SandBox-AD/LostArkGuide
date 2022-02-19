var express = require('express');
var router = express.Router();
const puppeteer = require('puppeteer');

async function scrap() {
    const brower = await puppeteer.launch({
        headless: false
    });
    const page = await brower.newPage();
    await page.goto("https://www.dexerto.fr/jeux-video/meilleurs-builds-demoniste-lost-ark-pve-pvp-competences-runes-1474728/");

    const tables = await page.evaluate(() => {
        let data = [];
        let td = document.querySelectorAll('#article > article > table:nth-child(21) > tbody >tr >td');
        console.log(td);
        for (const element of td) {
            if (element.innerHTML.includes('<span style="color: #ffffff;"><strong>') ) {
                let tmpHTML = element.innerHTML.substring(element.innerHTML.indexOf('<span style="color: #ffffff;"><strong>'), element.innerHTML.indexOf('</strong></span>'))
                console.log(tmpHTML);
            } else {
                console.log(element.innerHTML);
            }
        }
        return data
    });
    return tables;
    // await brower.close();
}
/* GET home page. */
router.get('/', function (req, res, next) {
    scrap()
    res.json({ username: scrap() })
});

module.exports = router;