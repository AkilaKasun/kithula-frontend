import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import Navbar from "./components/layout/navbar/navbar";
import Footer from "./components/layout/footer/footer";

import HomePage from "./pages/HomePage/HomePage";
import AboutUs from "./pages/AboutUs/AboutUs";
import Products from "./pages/Products/Products";
import ProductDetails from "./pages/Products/ProductDetails";
import CartPage from "./pages/CartPage/CartPage";
import CheckoutPage from "./pages/OrderPage/CheckoutPage";



function App() {
    return (
        <Router>
            <Navbar />
            <ToastContainer position="top-right" autoClose={3000} theme="colored" />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />

            </Routes>
            <Footer />
        </Router>
    );
}

export default App;