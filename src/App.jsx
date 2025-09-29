import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Reviews from './pages/Reviews';
import About from './pages/About';
import Contact from './pages/Contact';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';
import Loader from './components/Loader';

import './App.css';

function App() {
  // Force the loader to stay for ~5.5s on first mount
  const MIN_LOAD_MS = 5500;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), MIN_LOAD_MS);
    return () => clearTimeout(t);
  }, []);

  return (
    <Router>
      <div className="App min-h-screen bg-slate-50">
        <AnimatePresence mode="wait">
          {isLoading ? (
            // Loader blocks the whole app until finished
            <Loader key="loader" durationSec={MIN_LOAD_MS / 1000} />
          ) : (
            <div key="app">
              <ScrollToTop />
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/reviews" element={<Reviews />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </main>
              <Footer />
              <WhatsAppButton />
            </div>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
