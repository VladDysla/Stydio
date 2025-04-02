import React from "react";
import "./basic_style/style.css";
import Header from "./Component/Header/Header.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import About from "./Section/About.jsx";
import Services from "./Section/Services.jsx";
import Comand from "./Section/Comand.jsx";
import Reviews from "./Section/Reviews.jsx";
import Timetable from "./Section/Timetable.jsx";
import Map from "./Section/Map.jsx";
import Footer from "./Component/Footer/Footer.jsx";
import Product from "./Section/Product.jsx";
import Basket from "./Basket/Basket.jsx";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <About />
                <Services />
                <Product />
                <Comand />
                <Reviews />
                <Timetable />
                <Map />
              </>
            }
          />
          <Route path="/basket" element={<Basket />} />
          <Route path="/" element={<Footer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
