import { Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
  return (
    <>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
