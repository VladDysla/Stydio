import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./basket.css";
import Form from "./Form/Form";

const Basket = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const navigate = useNavigate();
  const [items, setItems] = React.useState([
    {
      id: 1,
      name: "Nuriectiv X7",
      price: 1299,
      quantity: 1,
      image: "https://via.placeholder.com/100?text=Nuriectiv+X7",
    },
    {
      id: 2,
      name: "Hidraker Pro",
      price: 899,
      quantity: 2,
      image: "https://via.placeholder.com/100?text=Hidraker+Pro",
    },
  ]);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="basket-container">
      <div className="basket-header">
        <h1>Ваш кошик</h1>
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Повернутись до покупок
        </button>
      </div>

      {items.length === 0 ? (
        <div className="empty-basket">
          <h2>Кошик порожній</h2>
          <button onClick={() => navigate("/")} className="primary-btn">
            Перейти до каталогу
          </button>
        </div>
      ) : (
        <>
          <div className="basket-items">
            {items.map((item) => (
              <div key={item.id} className="basket-item">
                <img src={item.image} alt={item.name} />
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <div className="quantity-controls">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="quantity-btn"
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="item-price">
                  <span>{item.price * item.quantity} ₴</span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="remove-btn"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="basket-summary">
            <div className="total">
              <span>Всього:</span>
              <span className="total-price">{total} ₴</span>
            </div>
            <button
              className="checkout-btn"
              onClick={() => setIsFormOpen(true)}
            >
              Оформити замовлення
            </button>
            {isFormOpen && (
              <Form
                items={items}
                total={total}
                onClose={() => setIsFormOpen(false)}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Basket;
