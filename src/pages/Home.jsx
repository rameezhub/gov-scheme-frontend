import { useNavigate } from "react-router-dom";
import "../App.css";

const categories = [ /* same as before */ ];

function Home() {
  const navigate = useNavigate();

  return (
    <div className="app">
      {/* same UI */}

      <div className="grid">
        {categories.map((c) => (
          <div
            key={c.name}
            className={`card ${c.color}`}
            onClick={() => navigate(`/schemes/${c.name}`)}
          >
            <div className="icon">{c.icon}</div>
            <p>{c.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
