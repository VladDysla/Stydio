import React, { useState } from "react";
import "./section.css";
import Facebook from "./../assents/images/facebook.png";
import Instagram from "./../assents/images/instagram.png";
import Telegram from "./../assents/images/telegram.png";

export default function About() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  
  return (
    <section className="about-sec">
      <div className="about-container">
        <div className="about-line"></div>
        <div className="burger-container">
      <button className="burger-btn" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      <nav className={`burger-menu ${isOpen ? "open" : ""}`}>
        <ul className="burger-list">
        <li 
          className="burger-item" 
          onClick={() => scrollToSection('about')}
        >
          Про нас
        </li>
        <li 
          className="burger-item" 
          onClick={() => scrollToSection('services')}
        >
          Послуги
        </li>
        <li 
          className="burger-item" 
          onClick={() => scrollToSection('products')}
        >
          Товари
        </li>
        <li 
          className="burger-item" 
          onClick={() => scrollToSection('comand')}
        >
          Команда
        </li>
        <li 
          className="burger-item" 
          onClick={() => scrollToSection('reviews')}
        >
          Відгуки
        </li>
        <li 
          className="burger-item" 
          onClick={() => scrollToSection('location')}
        >
          Локація
        </li>
        <li 
          className="burger-item" 
          onClick={() => scrollToSection('map')}
        >
          Карта
        </li>
        </ul>
      </nav>
    </div>
    <div className="about-list">
      <ul className="about-list__ul">
        <li 
          className="about-list__item" 
          onClick={() => scrollToSection('about')}
        >
          Про нас
        </li>
        <li 
          className="about-list__item" 
          onClick={() => scrollToSection('services')}
        >
          Послуги
        </li>
        <li 
          className="about-list__item" 
          onClick={() => scrollToSection('products')}
        >
          Товари
        </li>
        <li 
          className="about-list__item" 
          onClick={() => scrollToSection('comand')}
        >
          Команда
        </li>
        <li 
          className="about-list__item" 
          onClick={() => scrollToSection('reviews')}
        >
          Відгуки
        </li>
        <li 
          className="about-list__item" 
          onClick={() => scrollToSection('location')}
        >
          Локація
        </li>
        <li 
          className="about-list__item" 
          onClick={() => scrollToSection('map')}
        >
          Карта
        </li>
      </ul>
    </div>
        <div className="about-information-social__block" id="about">
          <div className="about-information__block">
            <h3>Про нас</h3>
            <p>
              Студія краси та епіляції Ірини Цуканової – це місце, де ваша краса
              розквітає, а догляд за собою стає справжнім задоволенням. <br />{" "}
              Ми пропонуємо професійні послуги з епіляції, використовуючи лише
              найсучасніші методики та якісні матеріали. Наші майстри – це
              досвідчені фахівці, які дбайливо підходять до кожного клієнта,
              гарантуючи безпечність, комфорт та довготривалий результат.
              Запрошуємо вас відчути сервіс преміального рівня та підкреслити
              свою природну красу разом із нами! ✨
            </p>
          </div>
          <div className="about-social__block">
            <b className="about-social__title">Соціальні посилання</b>
            <div className="about-socials">
            <div className="about-socials__icon">
                <a href="https://www.facebook.com/share/16GiAKtzRP/"><img src={Facebook} alt="" /></a>
              </div>
              <a href="https://www.facebook.com/share/16GiAKtzRP/">Facebook</a>
            </div>
            <div className="about-socials">
              <div className="about-socials__icon">
                <a href="https://www.instagram.com/depil_nivki?igsh=YWduZWpzZnhoOGRw"><img src={Instagram} alt="" /></a>
              </div>
              <a href="https://www.instagram.com/depil_nivki?igsh=YWduZWpzZnhoOGRw">Instagram</a>
            </div>
            <div className="about-socials">
            <div className="about-socials__icon">
                <a href="https://t.me/Iren_tsukanova"><img src={Telegram} alt="" /></a>
              </div>
              <a href="https://t.me/Iren_tsukanova">Telegram</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
