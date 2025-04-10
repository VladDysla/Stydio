import React from 'react'
import './footer.css'
import LogoFooter from '../../assents/images/logo.png'
import Facebook from "../../assents/images/facebook.png";
import Instagram from "../../assents/images/instagram.png";
import Telegram from "../../assents/images/telegram.png";
import Phone from "../../assents/images/phone.png";

export default function Footer() {
  
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
    <footer className="footer">
    <div className="footer-container">
      <div className="footer-logo">
        <img src={LogoFooter} alt="Логотип компанії" />
      </div>
      
      <ul className="footer-nav">
      <li 
          className="footer-nav__item" 
          onClick={() => scrollToSection('about')}
        >
          Про нас
        </li>
        <li 
          className="footer-nav__item" 
          onClick={() => scrollToSection('services')}
        >
          Послуги
        </li>
        <li 
          className="footer-nav__item" 
          onClick={() => scrollToSection('products')}
        >
          Товари
        </li>
        <li 
          className="footer-nav__item" 
          onClick={() => scrollToSection('comand')}
        >
          Команда
        </li>
        <li 
          className="footer-nav__item" 
          onClick={() => scrollToSection('reviews')}
        >
          Відгуки
        </li>
        <li 
          className="footer-nav__item" 
          onClick={() => scrollToSection('location')}
        >
          Локація
        </li>
        <li 
          className="footer-nav__item" 
          onClick={() => scrollToSection('map')}
        >
          Карта
        </li>
      </ul>
      
      <div className="footer-social">
        <div className="social-group">
          <a href="#" className="social-link">
            <img src={Instagram} alt="Instagram" />
            <span>Instagram</span>
          </a>
          <a href="#" className="social-link">
            <img src={Facebook} alt="Facebook" />
            <span>Facebook</span>
          </a>
        </div>
        
        <div className="social-group">
          <div className="phone-link">
            <img src={Phone} alt="Телефон" />
            <span>+380 93 756 1470</span>
          </div>
          <a href="#" className="social-link">
            <img src={Telegram} alt="Telegram" />
            <span>Telegram</span>
          </a>
        </div>
      </div>
    </div>
  </footer>
  )
}
