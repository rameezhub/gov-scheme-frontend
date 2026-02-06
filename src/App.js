import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import { api } from "./services/api";

function Home() {
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    api("/api/schemes")
      .then(setSchemes)
      .catch(console.error);
  }, []);

  return (
    <div className="app">
      <h2>Government Schemes</h2>

      {schemes.map((s) => (
        <div key={s.id} className="card">
          <h3>{s.name}</h3>
          <p>{s.description}</p>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Any route → Home */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
