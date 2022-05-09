// Imports
// ========================================================
import { Routes, Route } from "react-router-dom";

// Pages
import Home from "../pages/Home";
import About from "../pages/About";
import NotFound from "../pages/NotFound";

// Main Routes
// ========================================================
const RootRoutes = () => {
  return <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="*" element={<NotFound />} />
  </Routes>;
};

// Exports
// ========================================================
export default RootRoutes;