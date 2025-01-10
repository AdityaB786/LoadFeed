
---

# Twitter Trend Scraper

This project scrapes Twitter's trending topics using Puppeteer, stores the data in MongoDB, and displays it on a simple web page.

---

## Features

- Scrapes the top 5 trending topics from Twitter.
- Saves data (trends, timestamp, IP address) in MongoDB.
- Simple front-end to interact with the scraper.

---

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/twitter-trend-scraper.git
   cd twitter-trend-scraper
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run MongoDB** (locally or remotely).

4. **Start the app**:

   ```bash
   npm start
   ```

Visit `http://localhost:3000` in your browser.

---

## Usage

- Click "Generate Trends" on the web page to scrape trends.
- View the scraped data, including trends, timestamp, and IP address.
- Data is stored in MongoDB under the `twitterScraper` database.

---

## Data Format

MongoDB stores data as follows:

```json
{
  "_id": "ccc8c097-11a3-4154-98fc-5b4e9fd2008d",
  "nameoftrend1": "#INDvsAUSTest",
  "nameoftrend2": "#dhanashreeverma",
  "date_time": "2025-01-04T20:41:33.349Z",
  "ip_address": "45.118.157.49"
}
```
=======
# Twitter_tweetsFor_trump_biden
Scrapes the latest tweets from twitter for Trump , Biden or both.
>>>>>>> 8a34ba77ee09ea5b1071bd4b85e94a392e08df70
