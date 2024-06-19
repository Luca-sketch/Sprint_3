import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import Home from './pages/home/home';
import Products from './pages/product/product';
import { CartProvider } from './CartContext';
import './App.css';

const App = () => {
    return (
        <CartProvider>
            <div className="footer-container">
                <Router>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<Products />} />
                    </Routes>
                </Router>
                <Footer />
            </div>
        </CartProvider>
    );
};

export default App;


