import React from 'react'
import "./basic_style/style.css"
import Header from './Component/Header/Header.jsx';
import './App.css'
import About from './Section/About.jsx';
import Services from './Section/Services.jsx';
import Comand from './Section/Comand.jsx';
import Reviews from './Section/Reviews.jsx';
import Timetable from './Section/Timetable.jsx';
import Map from './Section/Map.jsx';
import Footer from './Component/Footer/Footer.jsx';

function App() {

  

  return (
    <div>
    <div className="App">
      <Header />
      <About />
      <Services/>
      <Comand/>
      <Reviews/>
      <Timetable/>
      <Map/>
    </div>
    <Footer/>
    </div>
  );
}

export default App;
