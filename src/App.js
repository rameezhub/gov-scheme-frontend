import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SchemeList from "./pages/SchemeList";
import SchemeDetails from "./pages/SchemeDetails";

const BASE_URL = "https://gov-scheme-backend-1.onrender.com";

const categories = [
  { name: "Farmer Welfare", icon: "🚜", color: "orange" },
  { name: "Education", icon: "🎓", color: "blue" },
  { name: "RTO Services", icon: "🚗", color: "orange" },
  { name: "Health Schemes", icon: "❤️", color: "orange" },
  { name: "Women & Child", icon: "👩‍👧", color: "blue" },
  { name: "Skill Development", icon: "⚙️", color: "orange" },
  { name: "Pension Schemes", icon: "👴👵", color: "orange" },
  { name: "Elderly Schemes", icon: "🧓", color: "blue" }
];

function App() {
  const [schemes, setSchemes] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/api/schemes`)
      .then((res) => res.json())
      .then(setSchemes)
      .catch(console.error);
  }, []);

  const filteredSchemes = schemes.filter((s) => {
    const matchText =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase());

    const matchCategory = selectedCategory
      ? s.categories?.includes(selectedCategory)
      : true;

    return matchText && matchCategory;
  });

  return (
    <div className="app">
      {/* Header */}
      <div className="header">
        <h3>Hello, Ruturaj</h3>
        <select>
          <option>English</option>
          <option>Hindi</option>
        </select>
      </div>

      {/* Search */}
      <input
        className="search"
        placeholder="Search schemes, loans, licenses..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Categories */}
      <div className="grid">
        {categories.map((c) => (
          <div
            key={c.name}
            className={`card ${c.color}`}
            onClick={() => setSelectedCategory(c.name)}
          >
            <div className="icon">{c.icon}</div>
            <p>{c.name}</p>
          </div>
        ))}
      </div>

      {/* Schemes List */}
      {filteredSchemes.length > 0 && (
        <div className="scheme-list">
          {filteredSchemes.map((s) => (
            <div key={s.id} className="scheme-card">
              <h4>{s.name}</h4>
              <p>{s.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Mic button */}
      <button className="mic">🎤</button>

      {/* Bottom nav */}
      <div className="bottom-nav">
        <span>🏠 Home</span>
        <span>📄 My Docs</span>
        <span>📍 Map</span>
        <span>❓ Help</span>
      </div>
    </div>
  );
}
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/schemes/:category" element={<SchemeList />} />
      <Route path="/scheme/:id" element={<SchemeDetails />} />
    </Routes>
  );
}

export default App;
