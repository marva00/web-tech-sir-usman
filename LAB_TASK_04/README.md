
# Driving School Express App

This project converts the static HTML/CSS layout into a dynamic Express.js application.

## Prerequisites

- Node.js installed

## Setup and Run

1. Open this folder in terminal.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node app.js
   ```
4. Visit `http://localhost:3000` in your browser.

## Project Structure

- `app.js`: Main server file.
- `views/`: EJS templates.
  - `partials/`: Reusable components (header, footer).
  - `index.ejs`: Home page.
  - `checkout.ejs`: Checkout page.
- `public/`: Static assets (CSS, images, JS).
- `routes/`: Route handlers.
