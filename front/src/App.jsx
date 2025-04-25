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
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="App">
                  <Header />
                  <About />
                  <Services />
                  <Product />
                  <Comand />
                  <Reviews />
                  <Timetable />
                  <Map />
                </div>
                <Footer />
              </>
            }
          />
          <Route path="/basket" element={<Basket />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
