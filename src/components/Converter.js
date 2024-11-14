import React, { useState, useEffect } from "react";

const API_KEY = "f5ab4cf5c5cb0fe0d488b7ad";
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest`;

function Converter() {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    fetch(API_URL + "/USD")
      .then((response) => response.json())
      .then((data) => {
        setCurrencies(Object.keys(data.conversion_rates));
      })
      .catch((error) => console.error("Error fetching currency data:", error));
  }, []);

  const convertCurrency = () => {
    fetch(`${API_URL}/${fromCurrency}`)
      .then((response) => response.json())
      .then((data) => {
        const rate = data.conversion_rates[toCurrency];
        setConvertedAmount((amount * rate).toFixed(2));
      })
      .catch((error) => console.error("Error converting currency:", error));
  };

  return (
    <div className="converter">
      <div>
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        <label>From:</label>
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>To:</label>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <button onClick={convertCurrency}>Convert</button>
      {convertedAmount && (
        <div className="result">
          {amount} {fromCurrency} = {convertedAmount} {toCurrency}
        </div>
      )}
    </div>
  );
}

export default Converter;
