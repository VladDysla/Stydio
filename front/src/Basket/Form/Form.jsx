import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import "../basket.css";
import { useSelector } from "react-redux";
import Success from '../Success/Success';

const Form = ({ total, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    delivery: 'nova_poshta',
    city: '',
    postOffice: '',
    payment: 'cash',
    comment: ''
  });

  const cartItems = useSelector((state) => state.products.cartItems);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderNumber, setOrderNumber] = useState(null);

  const generateOrderNumber = () => {
    return Math.floor(Math.random() * 90000) + 10000; // 5-значный номер
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newOrderNumber = generateOrderNumber();
    setOrderNumber(newOrderNumber);
    // Валидация обязательных полей
    if (!formData.name || !formData.phone || !formData.city || !formData.postOffice) {
      setError('Пожалуйста, заполните все обязательные поля');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const templateParams = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email || 'Не указан',
        delivery: formData.delivery === 'nova_poshta' ? 'Новая Почта' : 'Укрпошта',
        city: formData.city,
        postOffice: formData.postOffice,
        payment: formData.payment === 'cash' ? 'Наличными при получении' : 'Онлайн оплата',
        comment: formData.comment || 'Нет комментария',
        order_number: newOrderNumber,
        order: cartItems.map(item => 
          `${item.baseName} (${item.selectedVolume}) - ${item.quantity} × ${item.selectedPrice} ₴ = ${item.selectedPrice * item.quantity} ₴`
        ).join('<br/>'),
        total: `${total} ₴`,
        date: new Date().toLocaleString()
      };
      console.log("Відправляю такі дані:", templateParams);
      const response = await emailjs.send(
        'service_5zx8jai', // Ваш Service ID
        'template_fq05io8', // Ваш Template ID
        templateParams,
        'U3H4BTOXHx4HcVxJw' // Ваш User ID
      );

      if (response.status === 200) {
        setIsSuccess(true);
      } else {
        throw new Error('Ошибка при отправке письма');
      }
    } catch (err) {
      console.error('Ошибка отправки:', err);
      setError('Произошла ошибка при отправке заказа. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.');
    } finally {
      setIsLoading(false);
    }
  };
  console.log('cartItems:', cartItems)
  return (
    <div className="order-form-overlay">
      <div className="order-form-container">
        <button className="close-btn" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        
        <div className="order-header">
          <h2>Оформлення замовлення</h2>
          <div className="progress-bar">
            <div className="progress-step active">1</div>
            <div className="progress-line"></div>
            <div className="progress-step">2</div>
          </div>
        </div>
        
        <div className="order-summary">
          <div className="summary-header">
            <h3>Ваше замовлення</h3>
            <span>{cartItems.length} товар(и)</span>
          </div>
          <div className="items-scroll">
            {cartItems.map(item => (
              <div key={item.id} className="order-item">
                <div className="item-details">
                  <h4>{item.baseName}</h4>
                  <p>{item.selectedVolume}</p>
                </div>
                <div className="item-price">
                  {item.quantity} × {item.selectedPrice} ₴
                </div>
              </div>
            ))}
          </div>
          <div className="order-total">
            <span>До сплати:</span>
            <span className="total-amount">{total} ₴</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="order-form">
          {error && <div className="form-error">{error}</div>}

          <div className="form-section">
            <h3 className="section-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Контактні дані
            </h3>
            
            <div className="form-grid">
              <div className="form-group floating">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="name">Ім'я та прізвище*</label>
              </div>
              <div className="form-group floating">
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="phone">Телефон*</label>
              </div>
              <div className="form-group floating">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <label htmlFor="email">Email</label>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Доставка
            </h3>
            <div className="delivery-options">
              <label className={`delivery-option ${formData.delivery === 'nova_poshta' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="delivery"
                  value="nova_poshta"
                  checked={formData.delivery === 'nova_poshta'}
                  onChange={handleChange}
                />
                <div className="option-content">
                  <div className="option-icon">
                    <img src="https://cdn-icons-png.flaticon.com/512/2784/2784487.png" alt="Nova Poshta" />
                  </div>
                  <span>Нова Пошта</span>
                </div>
              </label>
              
              <label className={`delivery-option ${formData.delivery === 'ukrposhta' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="delivery"
                  value="ukrposhta"
                  checked={formData.delivery === 'ukrposhta'}
                  onChange={handleChange}
                />
                <div className="option-content">
                  <div className="option-icon">
                    <img src="https://cdn-icons-png.flaticon.com/512/3179/3179068.png" alt="Ukrposhta" />
                  </div>
                  <span>Укрпошта</span>
                </div>
              </label>
            </div>

            <div className="delivery-details">
              <div className="form-group floating">
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="city">Місто*</label>
              </div>
              <div className="form-group floating">
                <input
                  type="text"
                  name="postOffice"
                  id="postOffice"
                  value={formData.postOffice}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="postOffice">Відділення №*</label>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 14C19 15.5913 18.3679 17.1174 17.2426 18.2426C16.1174 19.3679 14.5913 20 13 20H11C9.4087 20 7.88258 19.3679 6.75736 18.2426C5.63214 17.1174 5 15.5913 5 14V7C5 5.67392 5.52678 4.40215 6.46447 3.46447C7.40215 2.52678 8.67392 2 10 2H14C15.3261 2 16.5979 2.52678 17.5355 3.46447C18.4732 4.40215 19 5.67392 19 7V14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 9V12L14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Оплата
            </h3>
            <div className="payment-options">
              <label className={`payment-option ${formData.payment === 'cash' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="payment"
                  value="cash"
                  checked={formData.payment === 'cash'}
                  onChange={handleChange}
                />
                <div className="option-content">
                  <div className="option-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 7H4C2.89543 7 2 7.89543 2 9V15C2 16.1046 2.89543 17 4 17H20C21.1046 17 22 16.1046 22 15V9C22 7.89543 21.1046 7 20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 13C16 13.5523 15.5523 14 15 14C14.4477 14 14 13.5523 14 13C14 12.4477 14.4477 12 15 12C15.5523 12 16 12.4477 16 13Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <span>Готівкою при отриманні</span>
                </div>
              </label>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Додатково
            </h3>
            <div className="form-group floating-textarea">
              <textarea
                name="comment"
                id="comment"
                value={formData.comment}
                onChange={handleChange}
                rows="3"
              />
              <label htmlFor="comment">Коментар до замовлення</label>
            </div>
          </div>

          <button 
            type="submit" 
            className="submit-btn" 
            disabled={isLoading}
          >
            {isLoading ? (
              <span>Відправка...</span>
            ) : (
              <>
                Підтвердити замовлення
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </>
            )}
          </button>
        </form>
      </div>
      
      {isSuccess && <Success onClose={onClose}  orderNumber={orderNumber}/>}
    </div>
  );
};

export default Form;