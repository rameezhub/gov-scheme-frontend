import { useState } from "react";

export default function Eligibility() {
  const [income, setIncome] = useState("");
  const [land, setLand] = useState("");
  const [result, setResult] = useState(null);

  const checkEligibility = () => {
    if (income < 200000 && land === "yes") {
      setResult("✅ Eligible for PM Kisan");
    } else {
      setResult("❌ Not Eligible");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Eligibility Checker</h2>

      <input
        placeholder="Annual Income"
        value={income}
        onChange={(e) => setIncome(e.target.value)}
      />

      <select onChange={(e) => setLand(e.target.value)}>
        <option value="">Own land?</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>

      <button onClick={checkEligibility}>Check</button>

      {result && <p>{result}</p>}
    </div>
  );
}
