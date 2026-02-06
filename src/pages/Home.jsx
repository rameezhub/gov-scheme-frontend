import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "./services/api";
import "./Home.css";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // TEMP categories (later from backend)
    setCategories([
      { name: "Farmer Welfare", slug: "farmer", icon: "🚜" },
      { name: "Education", slug: "education", icon: "🎓" },
      { name: "RTO Services", slug: "rto", icon: "🚗" },
      { name: "Health Schemes", slug: "health", icon: "❤️" },
      { name: "Women & Child", slug: "women", icon: "👩‍👧" },
      { name: "Skill Development", slug: "skill", icon: "⚙️" },
      { name: "Pension Schemes", slug: "pension", icon: "👴👵" },
      { name: "Elderly Schemes", slug: "elderly", icon: "🧓" },
    ]);
  }, []);

  const search = async (text) => {
    setQuery(text);
    const data = await api(`/api/schemes?search=${encodeURIComponent(text)}`);
    setResults(data);
  };

  const startVoice = () => {
    const Speech =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Speech) return alert("Voice not supported");

    const rec = new Speech();
    rec.lang = "en-IN";
    rec.start();
    rec.onresult = (e) => search(e.results[0][0].transcript);
  };

  return (
    <div className="home">
      <header>
        <h3>Hello, Ruturaj</h3>
        <select>
          <option>English</option>
        </select>
      </header>

      <input
        className="search"
        placeholder="Search schemes, loans, licenses..."
        value={query}
        onChange={(e) => search(e.target.value)}
      />

      <div className="grid">
        {(results.length ? results : categories).map((item) => (
          <div
            key={item.name}
            className="card"
            onClick={() =>
              item.slug && navigate(`/category/${item.slug}`)
            }
          >
            <div className="icon">{item.icon || "📄"}</div>
            <p>{item.name}</p>
          </div>
        ))}
      </div>

      <button className="mic" onClick={startVoice}>🎤</button>

      <footer>
        <span className="active">🏠 Home</span>
        <span>📄 My Docs</span>
        <span>📍 Map</span>
        <span>❓ Help</span>
      </footer>
    </div>
  );
}
