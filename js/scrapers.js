const puppeteer = require('puppeteer');

async function scrapeElo(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    try {
        await page.goto(url, { waitUntil: 'networkidle0' }); // Espera a que la página esté completamente cargada
        
        const xpathSelector = '//*[@id="__next"]/main/div/div[4]/div[1]/div[2]/div[2]/div/div[2]/div/div';
        const text = await page.evaluate((xpath) => {
            const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            return element.innerText;
        }, xpathSelector);
        
        console.log(text);
    } catch (error) {
        console.error('Error al realizar el scraping:', error);
    } finally {
        await browser.close(); // Cierra el navegador después de terminar
    }
}

scrapeElo('https://tft.op.gg/summoners/na/mi%20ultimo%20peso-2024');
