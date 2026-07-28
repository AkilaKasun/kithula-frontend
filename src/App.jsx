import "./App.css";
import Navbar from "./components/layout/navbar/navbar";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <>
      <Navbar />

      <main >
        <HomePage />
      </main>
    </>
  );
}

export default App;