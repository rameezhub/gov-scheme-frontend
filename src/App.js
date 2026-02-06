import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SchemeDetail from "./pages/SchemeDetail";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/scheme/:category/:id" element={<SchemeDetail />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
