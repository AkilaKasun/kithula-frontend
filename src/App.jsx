import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import Navbar from "./components/layout/navbar/navbar";

import HomePage from "./pages/HomePage/HomePage";
import AboutUs from "./pages/AboutUs/AboutUs";
import Products from "./pages/Products/Products";



function App() {
    return (
        <Router><Navbar />
            <ToastContainer position="top-right" autoClose={3000} theme="colored" />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/products" element={<Products />} />

            </Routes>
        </Router>
    );
}

export default App;