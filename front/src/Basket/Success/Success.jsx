import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../basket.css";

const Success = ({ onClose, orderNumber  }) => {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    if (onClose) {
      onClose();
    }
    navigate('/');
  };

  return (
    <div className="order-form-overlay">
      <div className="order-form-container success-container">
        <div className="success-content">
          <div className="success-icon">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round"/>
              <path d="M22 4L12 14.01L9 11.01" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          <h2>Замовлення успішно оформлено!</h2>
          
          <p className="success-message">
            Дякуємо за ваше замовлення! Для підтвердження вам зателефонує наш менеджер.
            Номер вашого замовлення: <strong>#{orderNumber}</strong>
          </p>
          
          <button 
            onClick={handleReturnHome}
            className="submit-btn success-btn"
          >
            Повернутись на головну
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;