# Web Scraper with Gemini + Next.js

![Next.js](https://img.shields.io/badge/Built%20With-Next.js-000?logo=nextdotjs&logoColor=white)
![Gemini API](https://img.shields.io/badge/Powered%20By-Gemini%20API-blueviolet?logo=google)
![License](https://img.shields.io/badge/License-MIT-green)

A modern, AI-enhanced web scraper built with Next.js and Gemini API. Simply enter a URL, and the AI will read and summarize the content from that link. No manual scraping or parsing — just plug and play intelligence.

---

## Features

- URL-based text extraction using Gemini’s browsing capabilities
- Summarization and question-answering powered by Gemini Pro
- Built with Next.js App Router
- Serverless and scalable

---

## Tech Stack

- Next.js (App Router)
- Gemini API (Google AI Studio)
- Tailwind CSS (for styling, optional)

---

## Getting Started

### 1. Clone the Repository

git clone https://github.com/Gurushanth1/scrapeeit.git
cd scrapeeit

### 2. Install Dependencies

npm install

### 3. Set Up Environment Variables

Create a `.env.local` file with your Gemini API key:

GEMINI_API_KEY=your_google_ai_studio_key

### 4. Run the Dev Server

npm run dev

Visit http://localhost:3000 to get started.

---

## How It Works

- User submits a URL
- The backend sends the prompt along with the URL to Gemini
- Gemini fetches and reads the page using its browsing tools
- AI response is streamed back to the UI

---

---

## License

MIT License

---

## Author

Made with ❤️ by [@Gurushanth1](https://github.com/Gurushanth1)
