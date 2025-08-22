import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import ScrollToTop from "./components/ScrollToTop"; // 👈 import here

function App() {
  return (
    <Router>
      <ScrollToTop /> {/* 👈 add here */}
      <div className="min-h-screen font-sans">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          {/* <Route path="/canvas" element={<CanvasEditor />} /> */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
