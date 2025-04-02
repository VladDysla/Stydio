import React, { useState } from 'react';
import "../basket.css";

const Form = ({ items, total, onClose }) => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Тут логіка відправки форми
    console.log({ order: items, total, ...formData });
    onClose();
  };

  return (
    <div className="order-form-overlay">
      <div className="order-form-container">
        <button className="close-btn" onClick={onClose}>×</button>
        
        <h2>Оформлення замовлення</h2>
        
        <div className="order-summary">
          <h3>Ваше замовлення</h3>
          <ul>
            {items.map(item => (
              <li key={item.id}>
                {item.name} × {item.quantity} - {item.price * item.quantity} ₴
              </li>
            ))}
          </ul>
          <div className="order-total">
            <span>До сплати:</span>
            <span className="total-amount">{total} ₴</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="order-form">
          <div className="form-section">
            <h3>Контактні дані</h3>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Ім'я та прізвище"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="tel"
                name="phone"
                placeholder="Телефон"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Доставка</h3>
            <div className="form-group radio-group">
              <label>
                <input
                  type="radio"
                  name="delivery"
                  value="nova_poshta"
                  checked={formData.delivery === 'nova_poshta'}
                  onChange={handleChange}
                />
                Нова Пошта
              </label>
              <label>
                <input
                  type="radio"
                  name="delivery"
                  value="ukrposhta"
                  checked={formData.delivery === 'ukrposhta'}
                  onChange={handleChange}
                />
                Укрпошта
              </label>
              <label>
                <input
                  type="radio"
                  name="delivery"
                  value="courier"
                  checked={formData.delivery === 'courier'}
                  onChange={handleChange}
                />
                Кур'єр (Київ)
              </label>
            </div>

            {formData.delivery !== 'courier' && (
              <>
                <div className="form-group">
                  <input
                    type="text"
                    name="city"
                    placeholder="Місто"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="postOffice"
                    placeholder="Відділення №"
                    value={formData.postOffice}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}
          </div>

          <div className="form-section">
            <h3>Оплата</h3>
            <div className="form-group radio-group">
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="cash"
                  checked={formData.payment === 'cash'}
                  onChange={handleChange}
                />
                Готівкою при отриманні
              </label>
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={formData.payment === 'card'}
                  onChange={handleChange}
                />
                Оплата карткою онлайн
              </label>
            </div>
          </div>

          <div className="form-group">
            <textarea
              name="comment"
              placeholder="Коментар до замовлення"
              value={formData.comment}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="submit-btn">
            Підтвердити замовлення
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;