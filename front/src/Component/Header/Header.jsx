import React, { useState } from "react";
import "./header.css";
import Logo from "../../assents/images/logo.png";
import Basket from "../../assents/images/basket.png";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Добавляем импорт

export default function Header() {
  const phoneNumber = "0937561470";
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Получаем количество товаров в корзине из Redux
  const cartItems = useSelector((state) => state.products.cartItems);
  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const ArrowIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="40" fill="none" />
      <polygon points="20,5 12,22 18,22 14,35 28,18 21,18" fill="while" />
    </svg>
  );

  const PhoneIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z"
        fill="currentColor"
      />
    </svg>
  );

  const Modal = () => (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Запис на послугу</h3>
        <p>Запис відбувається тільки через телефон</p>
        <button
          className="modal-phone-btn"
          onClick={() => (window.location.href = `tel:${phoneNumber}`)}
        >
          <PhoneIcon />
          <span>+380 93 756 1470</span>
        </button>
        <button
          className="modal-close-btn"
          onClick={() => setIsModalOpen(false)}
        >
          Закрити
        </button>
      </div>
    </div>
  );

  const navigate = useNavigate();
  return (
    <header>
      <div className="header-container">
        <div className="header-logo__div">
          <img className="header-logo" src={Logo} alt="Logo" />
        </div>
        <div className="header-inform__block">
          <p className="header-inform__first_p">САЛОН КРАСИ</p>
          <h1>Beauty Studio</h1>
          <p className="header-inform__sec_p">
            вулиця Данила Щербаківського 4, Київ, 03190 · Beauty Studio
          </p>
          <button
            type="button"
            className="header-btn"
            onClick={() => setIsModalOpen(true)}
          >
            <span className="self-center whitespace-no-wrap">Записатися</span>
          </button>
        </div>
        <div className="header-btn__phone">
          <button
            type="button"
            className="header-btn_tell"
            onClick={() => (window.location.href = `tel:${phoneNumber}`)}
          >
            <span className="self-center whitespace-no-wrap">
              +380 93 756 1470
            </span>
          </button>
          <button className="basket-icon" onClick={() => navigate("/basket")}>
            <img src={Basket} alt="Кошик" />
            <span className="basket-counter">{cartItemsCount}</span>
          </button>
        </div>
      </div>

      {isModalOpen && <Modal />}
    </header>
  );
}