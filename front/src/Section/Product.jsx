import React, { useState } from 'react';

export default function Product() {
  const [activeCategory, setActiveCategory] = useState('nuriectiv');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = {
    nuriectiv: [
      {
        id: 1,
        name: 'Nuriectiv X7',
        description: 'Покращує когнітивні функції та концентрацію',
        price: '₴1,299',
        image: 'https://via.placeholder.com/300x200?text=Nuriectiv+X7'
      },
      {
        id: 2,
        name: 'Nuriectiv Omega',
        description: 'Розвиває креативне мислення та нейропластичність',
        price: '₴1,599',
        image: 'https://via.placeholder.com/300x200?text=Nuriectiv+Omega'
      }
    ],
    hidraker: [
      {
        id: 3,
        name: 'Hidraker Pro',
        description: 'Інтенсивне зволоження на клітинному рівні',
        price: '₴899',
        image: 'https://via.placeholder.com/300x200?text=Hidraker+Pro'
      },
      {
        id: 4,
        name: 'Hidraker Ultra',
        description: '72-годинний захист від зневоднення',
        price: '₴1,199',
        image: 'https://via.placeholder.com/300x200?text=Hidraker+Ultra'
      }
    ]
  };

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <section className="erayba-products">
      <div className="container">
        <h2 className="section-title">Продукти Erayba</h2>
        
        <div className="category-tabs">
          <button 
            className={`tab-btn ${activeCategory === 'nuriectiv' ? 'active' : ''}`}
            onClick={() => setActiveCategory('nuriectiv')}
          >
            Ерайба Нурієктів
          </button>
          <button 
            className={`tab-btn ${activeCategory === 'hidraker' ? 'active' : ''}`}
            onClick={() => setActiveCategory('hidraker')}
          >
            Ерайба Хідракер
          </button>
        </div>
        
        <div className="products-grid">
          {products[activeCategory].map(product => (
            <div key={product.id} className="product-card" onClick={() => openModal(product)}>
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">{product.price}</p>
              <button className="product-btn">Детальніше</button>
            </div>
          ))}
        </div>
      </div>

      {/* Модальне вікно */}
      {selectedProduct && (
        <div className="product-modal">
          <div className="modal-content">
            <span className="close-btn" onClick={closeModal}>&times;</span>
            <img src={selectedProduct.image} alt={selectedProduct.name} />
            <h3>{selectedProduct.name}</h3>
            <p className="modal-description">{selectedProduct.description}</p>
            <p className="modal-price">{selectedProduct.price}</p>
            <button className="buy-btn">Додати до кошика</button>
          </div>
        </div>
      )}
    </section>
  );
}