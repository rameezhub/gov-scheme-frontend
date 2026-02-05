import "./App.css";

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
      />

      {/* Categories */}
      <div className="grid">
        {categories.map((c) => (
          <div key={c.name} className={`card ${c.color}`}>
            <div className="icon">{c.icon}</div>
            <p>{c.name}</p>
          </div>
        ))}
      </div>

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

export default App;
