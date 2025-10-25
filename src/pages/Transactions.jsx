import { useEffect, useState } from "react";
import api from "../api";


export default function Transactions() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("BRL");
  const [value, setValue] = useState("");
  const [transactions, setTransactions] = useState([]);

  const user = JSON.parse(localStorage.getItem("user")) || {id: 1};


    const handleConvert = async () => {
        const res = await api.get("/transactions/", {
            user_id: user.id,
            from_currency: fromCurrency,
            to_currency: toCurrency,
            value: parseFloat(value),
        });
        setTransactions([...transactions, res.data]);
    };

    const loadTransactions = async () => {
        const res = await api.get(`/transaction?userId=${user.id}/`);
        setTransactions(res.data);
    };

    useEffect(() => {
        loadTransactions();
    }, []);

  return (
    <div className="container">
      <h2>Currency Converter</h2>
      <div className="form">
        <input type="number" className={"input-value-currency-converter"} placeholder="Value" value={value} onChange={(e) => setValue(e.target.value)} />
        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          <option>USD</option>
          <option>BRL</option>
          <option>EUR</option>
          <option>JPY</option>
        </select>
        <span>→</span>
        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          <option>USD</option>
          <option>BRL</option>
          <option>EUR</option>
          <option>JPY</option>
        </select>
        <button onClick={handleConvert}>Convert</button>
      </div>

      <h3>History</h3>
      <table>
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Value</th>
            <th>Converted</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td>{t.from_currency}</td>
              <td>{t.to_currency}</td>
              <td>{t.from_value}</td>
              <td>{t.to_value}</td>
              <td>{t.rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}