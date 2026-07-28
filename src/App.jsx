import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/navbar/navbar";
import HomePage from "./pages/HomePage/HomePage";
import { ToastContainer } from 'react-toastify';

function App() {
    return (
        <Router><Navbar />
            <ToastContainer position="top-right" autoClose={3000} theme="colored" />
            <Routes>
                <Route path="/" element={<HomePage />} />

            </Routes>
        </Router>
    );
}

export default App;