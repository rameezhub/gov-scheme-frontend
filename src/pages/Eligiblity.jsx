import { useState } from "react";
import { api } from "../services/api";

export default function Eligibility() {
  const [age, setAge] = useState("");
  const [income, setIncome] = useState("");
  const [state, setState] = useState("");
  const [schemes, setSchemes] = useState([]);

  const checkEligibility = async () => {
    const data = await api(
      `/api/schemes/recommend?age=${age}&income=${income}&state=${state}`
    );
    setSchemes(data);
  };

  return (
    <div className="page">
      <h2>Check Eligibility</h2>

      <input placeholder="Age" onChange={(e) => setAge(e.target.value)} />
      <input placeholder="Annual Income" onChange={(e) => setIncome(e.target.value)} />
      <input placeholder="State" onChange={(e) => setState(e.target.value)} />

      <button onClick={checkEligibility}>Find Eligible Schemes</button>

      {schemes.map((s) => (
        <div key={s.id} className="scheme-card">
          <h3>{s.name}</h3>
          <p>{s.description}</p>
        </div>
      ))}
    </div>
  );
}
