import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import PortfolioPage from "./pages/PortfolioPage";
// import ServicesPage from "./pages/ServicesPage";
// import ContactPage from "./pages/ContactPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      <div className="min-h-screen font-sans">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="contact" element={<Contact />} />
          {/* <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} /> */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
