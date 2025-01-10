const puppeteer = require('puppeteer'); //A Node.js library used for web scraping and automation.
// const Article = require('../Models/article');

exports.scrapeCNN = async (req, res) => {
    const query = req.query.query || 'both'; // Default query to scrape articles for both Trump and Biden

    const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox', '--disable-setuid-sandbox'] }); //It launches a browser instance
    const page = await browser.newPage(); //It opens a new tab in the browser

    try {
        console.log("Starting CNN scraping...");

        // Function to scrape articles based on the query
        const scrapeArticles = async (searchQuery) => {
            const searchUrl = `https://edition.cnn.com/search?q=${searchQuery}`;
            console.log(`Navigating to search page: ${searchUrl}`);
            await page.goto(searchUrl, { waitUntil: 'networkidle0', timeout: 60000 }); //networkidle0 - Ensures the page is fully loaded by waiting until no network activity is detected.

            console.log("Waiting for search results to load...");
            //search__results is a container on the webpage with our desired content
            await page.waitForSelector('.search__results', { timeout: 60000 });

            console.log("Scraping articles...");
            return await page.evaluate(() => {  //page.evaluate - Executes JS within the browser context to extract data.
                //We are selecting all article cards and then iterating over each card to extract info.
                return Array.from(document.querySelectorAll('.card')).map(el => {
                    const title = el.querySelector('.container__headline-text')?.textContent.trim() || null;
                    const link = el.querySelector('a.container__link')?.href || null;
                    return { title, link, date: new Date().toISOString() }; // Adding  timestamp for each article
                }).filter(article => article.title && article.link); // Ensuring both title and link exist,removes incomplete articles.
            });
        };

        let allArticles = [];

        // Handling "both" case where we scrape articles for both Trump and Biden
        if (query === 'both') {
            const trumpArticles = await scrapeArticles('Trump');
            const bidenArticles = await scrapeArticles('Biden');
            allArticles = [...trumpArticles, ...bidenArticles]; // Combining articles for both queries
        } else {
            allArticles = await scrapeArticles(query); // Scraping only for the specified query
        }

        if (!allArticles || allArticles.length === 0) {
            console.warn("No articles found for the query.");
            return res.status(200).json({ success: true, data: [] });
        }

        console.log("Storing articles in MongoDB...");
        // await Article.insertMany(allArticles, { ordered: false }).catch(err => {
        //     if (err.code !== 11000) throw err; // Ignoring duplicate entries
        // });

        console.log(`Successfully stored ${allArticles.length} articles.`);
        return res.status(200).json({ message: "Articles scraped and stored successfully", data: allArticles });
    } catch (error) {
        console.error("An error occurred during the CNN scraping process:", error);
        await page.screenshot({ path: 'cnn_error_screenshot.png' }); // Saving a screenshot for debugging
        return res.status(500).json({ error: "Scraping failed. Check server logs and screenshot for details." });
    } finally {
        await browser.close();
    }
};