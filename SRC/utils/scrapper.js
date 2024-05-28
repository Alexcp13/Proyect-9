const puppeteer = require("puppeteer");
const fs = require("fs");

const portatilesArray = [];


const scrapper = async (url) => {

    const browser = await puppeteer.launch({ headless: false });

    const page = await browser.newPage();

    await page.goto(url);

    await page.setViewport({ width: 1080, height: 1024 });




    repeat(page, browser);
};



const repeat = async (page, browser) => {
    const arraysDivs = await page.$$(".product-card");

    for (const portatilDiv of arraysDivs) {

        let title = await portatilDiv.$eval(".product-card__title", (el) => el.textContent);
        let img = await portatilDiv.$eval("img", (el) => el.src);


        let lowestPrice = Number.POSITIVE_INFINITY;
        const priceElement = await portatilDiv.$(".product-card__price-container");
        const priceText = await page.evaluate(el => el.textContent, priceElement);


        const price = parseFloat(priceText.replace("$", "").trim());


        if (price < lowestPrice) {
            lowestPrice = price;
        }


        const pc = {
            title,
            price,
            img
        }
        portatilesArray.push(pc)
    }

    try {
        await page.$eval("[aria-label= 'Página siguiente']", (el) => el.click());

        await page.waitForNavigation();

        repeat(page, browser);
    } catch (error) {
        write(portatilesArray);
        await browser.close()

    }



};








const write = (portatilesArray) => {
    fs.writeFile("portatiles.json", JSON.stringify(portatilesArray), () => {

        console.log("Archivo escrito");
    })
};



module.exports = { scrapper }


