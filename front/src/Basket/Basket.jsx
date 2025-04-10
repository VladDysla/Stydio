import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./basket.css";
import Form from "./Form/Form";
import { updateCartItem, removeFromCart } from "../redux/slices/productSlice";

const Basket = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.products.cartItems);

  const total = cartItems.reduce(
    (sum, item) => sum + (item.selectedPrice * item.quantity),
    0
  );

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateCartItem({ id, quantity: newQuantity }));
  };

  const removeItem = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="basket-container">
      <div className="basket-header">
        <button onClick={() => navigate(-1)} className="back-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Назад
        </button>
        <h1>Ваш кошик</h1>
        <div className="cart-count">{cartItems.length} товар(ів)</div>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-basket">
          <div className="empty-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2>Ваш кошик порожній</h2>
          <p>Додайте товари з каталогу</p>
          <button onClick={() => navigate("/")} className="primary-btn">
            Перейти до каталогу
          </button>
        </div>
      ) : (
        <>
          <div className="basket-items">
            {cartItems.map((item) => (
              <div key={`${item._id}-${item.selectedVolume}`} className="basket-item">
                <div className="item-details">
                  <div className="item-header">
                    <h3>{item.baseName}</h3>
                    <button
                      onClick={() => removeItem(item._id)}
                      className="remove-btn"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>
                  <p className="item-volume">Об'єм: {item.selectedVolume}</p>
                  <div className="item-controls">
                    <div className="quantity-control">
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="quantity-btn minus"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="quantity-btn plus"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                    <div className="item-price">{item.totalPrice} ₴</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="basket-summary">
            <div className="summary-row">
              <span>Товари:</span>
              <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)} шт.</span>
            </div>
            <div className="summary-row">
              <span>Доставка:</span>
              <span>За тарифами перевізника</span>
            </div>
            <div className="summary-total">
              <span>Всього:</span>
              <span className="total-price">{total} ₴</span>
            </div>
            <button
              className="checkout-btn"
              onClick={() => setIsFormOpen(true)}
            >
              Оформити замовлення
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          
          {isFormOpen && (
            <Form
              items={cartItems}
              total={total}
              onClose={() => setIsFormOpen(false)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Basket;