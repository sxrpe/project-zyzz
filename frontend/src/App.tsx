import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Navigation from './components/Navigation';
import Contact from "./pages/Contact.tsx";

function App() {
    return (
        <Router>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                {/* Aggiungi questa route per gestire gli URL non riconosciuti */}
                <Route path="*" element={<div>404 - Pagina non trovata</div>} />
            </Routes>
        </Router>
    );
}

export default App;