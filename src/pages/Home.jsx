import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("en");
  const navigate = useNavigate();

  /* ---------------- Farmer Schemes (Local with ID) ---------------- */
  const farmerSchemes = [
    {
      id: 1,
      name:
        language === "hi"
          ? "प्रधानमंत्री किसान सम्मान निधि"
          : "PM Kisan Samman Nidhi",
      description:
        language === "hi"
          ? "किसानों को ₹6000 वार्षिक सहायता"
          : "₹6000 yearly income support for farmers",
      icon: "🌾",
    },
    {
      id: 2,
      name:
        language === "hi"
          ? "प्रधानमंत्री फसल बीमा योजना"
          : "Crop Insurance Scheme",
      description:
        language === "hi"
          ? "प्राकृतिक आपदाओं से फसल सुरक्षा"
          : "Insurance coverage against crop loss",
      icon: "☔",
    },
  ];

  /* ---------------- Categories (EN / HI) ---------------- */
  useEffect(() => {
    setCategories([
      {
        name: language === "hi" ? "किसान कल्याण" : "Farmer Welfare",
        slug: "farmer",
        icon: "🚜",
      },
      {
        name: language === "hi" ? "शिक्षा" : "Education",
        slug: "education",
        icon: "🎓",
      },
      {
        name: language === "hi" ? "आरटीओ सेवाएं" : "RTO Services",
        slug: "rto",
        icon: "🚗",
      },
      {
        name: language === "hi" ? "स्वास्थ्य योजनाएं" : "Health Schemes",
        slug: "health",
        icon: "❤️",
      },
      {
        name: language === "hi" ? "महिला एवं बाल" : "Women & Child",
        slug: "women",
        icon: "👩‍👧",
      },
      {
        name: language === "hi" ? "कौशल विकास" : "Skill Development",
        slug: "skill",
        icon: "⚙️",
      },
      {
        name: language === "hi" ? "पेंशन योजनाएं" : "Pension Schemes",
        slug: "pension",
        icon: "👴👵",
      },
      {
        name: language === "hi" ? "वरिष्ठ नागरिक" : "Elderly Schemes",
        slug: "elderly",
        icon: "🧓",
      },
    ]);
  }, [language]);

  /* ---------------- Search (Backend-safe) ---------------- */
  const search = async (text) => {
    setQuery(text);

    if (!text.trim()) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        `https://gov-scheme-backend-1.onrender.com/api/schemes?search=${encodeURIComponent(
          text
        )}`
      );
      const data = await res.json();
      setResults(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Search failed:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- Voice Search (EN / HI) ---------------- */
  const startVoice = () => {
    const Speech =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!Speech) {
      alert("Voice search not supported");
      return;
    }

    const rec = new Speech();
    rec.lang = language === "hi" ? "hi-IN" : "en-IN";
    rec.start();

    rec.onresult = (e) => {
      const text = e.results[0][0].transcript;
      search(text);
    };
  };

  return (
    <div className="home">
      {/* Header */}
      <header>
        <h3>
          {language === "hi" ? "नमस्ते, रुतुराज" : "Hello, Ruturaj"}
        </h3>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
        </select>
      </header>

      {/* Search */}
      <input
        className="search"
        placeholder={
          language === "hi"
            ? "योजनाएं, ऋण, लाइसेंस खोजें..."
            : "Search schemes, loans, licenses..."
        }
        value={query}
        onChange={(e) => search(e.target.value)}
      />

      {/* Loading */}
      {loading && (
        <p className="loading">
          {language === "hi" ? "खोज जारी है..." : "Searching..."}
        </p>
      )}

      {/* Grid */}
      <div className="grid">
        {(results.length > 0 ? results : categories).map((item) => (
          <div
            key={item.id || item.slug}
            className="card"
            onClick={() => {
              // Category click
              if (item.slug === "farmer") {
                setResults(farmerSchemes);
              }
              // Farmer scheme detail
              else if (item.id) {
                navigate(`/scheme/farmer/${item.id}`);
              }
              // Other categories
              else if (item.slug) {
                navigate(`/category/${item.slug}`);
              }
            }}
          >
            <div className="icon">{item.icon || "📄"}</div>
            <p>{item.name}</p>
            {item.description && <small>{item.description}</small>}
          </div>
        ))}
      </div>

      {/* Empty */}
      {query && !loading && results.length === 0 && (
        <p className="empty">
          {language === "hi"
            ? "कोई योजना नहीं मिली"
            : "No schemes found"}
        </p>
      )}

      {/* Voice Button */}
      <button className="mic" onClick={startVoice}>
        🎤
      </button>

      {/* Footer */}
      <footer>
        <span className="active">
          🏠 {language === "hi" ? "होम" : "Home"}
        </span>
        <span>📄 {language === "hi" ? "मेरे दस्तावेज़" : "My Docs"}</span>
        <span>📍 {language === "hi" ? "मानचित्र" : "Map"}</span>
        <span>❓ {language === "hi" ? "सहायता" : "Help"}</span>
      </footer>
    </div>
  );
}
