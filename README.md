

```markdown
# Twitter and CNN News Scraper

This project is a web application built with **Vite** and **React** for the frontend, and **Node.js**, **Express**, and **Puppeteer** for the backend. It scrapes tweets from Twitter and news articles from CNN related to Donald Trump, Joe Biden, or both.

## Features

- **Scrape Tweets**: Fetches the latest tweets related to Trump, Biden, or both.
- **Scrape News**: Extracts news articles from CNN about Trump, Biden, or both.
- **Interactive Frontend**: A responsive and user-friendly interface built with React.
- **Efficient Backend**: Leverages Puppeteer for precise web scraping and Node.js for API handling.

## Tech Stack

### Frontend
- **Vite**: For lightning-fast development.
- **React**: For building interactive UI components.

### Backend
- **Node.js**: For server-side operations.
- **Express**: For creating RESTful APIs.
- **Puppeteer**: For web scraping tasks.

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/twitter-cnn-scraper.git
   cd twitter-cnn-scraper
   ```

2. Install dependencies:
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. Start the application:
   ```bash
   # Start the backend server
   cd server
   npm start

   # Start the frontend development server
   cd ../client
   npm run dev
   ```

4. Open the application in your browser:
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

## API Endpoints

### Tweets Scraping
- **GET /api/scrape/tweets/:query**  
  Fetch tweets related to the specified query (`Trump`, `Biden`, or `Both`).

### News Scraping
- **GET /api/scrape/news/:query**  
  Fetch CNN news articles related to the specified query (`Trump`, `Biden`, or `Both`).

## Usage

1. Open the web app.
2. Select the topic (`Trump`, `Biden`, or `Both`).
3. View the latest tweets and news directly on the interface.

## Folder Structure

```
project-root/
├── client/        # Frontend source code (Vite + React)
├── server/        # Backend source code (Node.js + Express + Puppeteer)
├── README.md      # Documentation
```

## Dependencies

### Frontend
- `react`, `react-dom`
- `vite`

### Backend
- `express`
- `puppeteer`

