# 💱 Currency Exchanger Web App

A simple yet powerful **Currency Converter** web application built using **HTML, CSS, JavaScript**, and real-time **Exchange Rate API**. The app allows users to select two currencies and instantly convert values between them using live exchange rates.

## 🌐 Live Demo

[Play Now](https://live-currency-exchanger.netlify.app/)  


---

## 📌 Features

- 🔄 Real-time exchange rate conversion
- 🌍 Supports multiple international currencies
- 📥 Dropdown to select both base and target currencies
- ⏱️ Fetches live rates using a currency API
- 📱 Fully responsive and mobile-friendly UI
- ⚠️ Error handling for invalid inputs or API failures

---

## 🛠️ Tech Stack

| Technology | Purpose                         |
|------------|---------------------------------|
| HTML5      | Structure of the app            |
| CSS3       | Styling and layout              |
| JavaScript | Fetch API, DOM Manipulation     |
| API        | Live exchange rates integration |

---

## 🔗 API Used

- [ExchangeRate-API](https://latest.currency-api.pages.dev/v1/currencies)   
- You must sign up to get a free API key.  
- The app uses `fetch()` to call the endpoint and update conversion results.

```js
// Sample fetch logic
fetch(`https://api.exchangerate-api.com/v4/latest/USD`)
  .then(response => response.json())
  .then(data => {
    const rate = data.rates['INR'];
    // convert and display result
  });
