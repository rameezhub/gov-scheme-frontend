import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; // ✅ USE Home.jsx

export default function App() {
  return (
    <Routes>
      {/* All routes go to Home */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
