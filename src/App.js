import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SchemeDetail from "./pages/SchemeDetail";
import Eligibility from "./pages/Eligibility";


export default function App() {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Scheme detail */}
      <Route
        path="/scheme/:category/:id"
        element={<SchemeDetail />}
      />

      {/* Eligibility checker */}
      <Route
        path="/eligibility"
        element={<Eligibility />}
      />

      {/* Fallback → Home (important for Render refresh) */}
      <Route path="*" element={<Home />} />
    </Routes>
    
  );
}
