import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../redux/slices/productSlice.js";

export default function Product() {
  const [product, setProduct] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [activeButton, setActiveButton] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedVolume, setSelectedVolume] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showGoToCartModal, setShowGoToCartModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.products.cartItems);

  const addToBasket = () => {
    if (selectedProduct) {
      dispatch(
        addToCart({
          product: selectedProduct,
          selectedVolume,
          selectedPrice,
          quantity,
        })
      );

      // Показуємо сповіщення
      setShowSuccessAlert(true);

      // Ховаємо сповіщення через 3 секунди
      setTimeout(() => setShowSuccessAlert(false), 3000);

      // Показуємо модалку з підтвердженням
      setShowGoToCartModal(true);

      // Закриваємо модалку вибору товару
      closeModal();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/product/");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setProduct(result);

        const groupedProducts = groupProductsByName(result);
        setFilteredProduct(
          groupedProducts.filter((prod) => prod.baseName.includes("HydraKer"))
        );
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchData();
  }, []);


  const groupProductsByName = (products) => {
    const groups = {};

    products.forEach((product) => {
      const baseName = product.name.split(",")[0].trim();
      if (!groups[baseName]) {
        groups[baseName] = {
          _id: product._id,
          baseName,
          description:
            product.description || "Професійний засіб для догляду за волоссям",
          variants: [],
        };
      }

      const size = product.name.split(",")[1]?.trim() || "стандарт";
      groups[baseName].variants.push({
        size,
        price: product.cost,
        image: product.image,
        originalProduct: product,
      });
    });

    Object.values(groups).forEach((group) => {
      group.variants.sort((a, b) => {
        const aSize = parseInt(a.size.match(/\d+/)?.[0] || 0);
        const bSize = parseInt(b.size.match(/\d+/)?.[0] || 0);
        return aSize - bSize;
      });
    });

    return Object.values(groups);
  };

  useEffect(() => {
    if (product.length > 0) {
      const groupedProducts = groupProductsByName(product);

      if (activeButton === 1) {
        setFilteredProduct(
          groupedProducts.filter((prod) => prod.baseName.includes("HydraKer"))
        );
      } else if (activeButton === 2) {
        setFilteredProduct(
          groupedProducts.filter((prod) =>
            prod.baseName.includes("NutriActive")
          )
        );
      }
    }
  }, [activeButton, product]);

  const openModal = (product) => {
    setSelectedProduct(product);
    setSelectedVolume(product.variants[0].size);
    setSelectedPrice(product.variants[0].price);
    setQuantity(1);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };
  console.log("product:", product);
  return (
    <section className="erayba-products">
      <div className="container" id="products">
        <h2 className="section-title">Продукти Erayba</h2>

        <div className="category-tabs">
          <button
            className={`tab-btn ${activeButton === 1 ? "active" : ""}`}
            onClick={() => setActiveButton(1)}
          >
            Ерайба Хідракер
          </button>
          <button
            className={`tab-btn ${activeButton === 2 ? "active" : ""}`}
            onClick={() => setActiveButton(2)}
          >
            Ерайба Нурієктів
          </button>
        </div>

        <div className="products-grid">
          {filteredProduct.map((product) => (
            <div
              key={product._id}
              className="product-card"
              onClick={() => openModal(product)}
            >
              <div className="product-image">
                <img src={product.variants[0].image} alt={product.baseName} />
              </div>
              <h3 className="product-name">{product.baseName}</h3>
              <p className="product-price">від {product.variants[0].price} ₴</p>
              <button className="product-btn">Детальніше</button>
            </div>
          ))}
        </div>
      </div>

      {/* Сповіщення про успішне додавання */}
      {showSuccessAlert && (
        <div className="success-alert">
          <span>✓</span> Товар успішно додано до кошика!
        </div>
      )}

      {/* Модалка вибору товару */}
      {selectedProduct && (
        <div className="product-modal">
          <div className="modal-content">
            <span className="close-btn" onClick={closeModal}>
              &times;
            </span>
            <div className="modal-image-container">
              <img
                src={
                  selectedProduct.variants.find(
                    (v) => v.size === selectedVolume
                  )?.image || selectedProduct.variants[0].image
                }
                alt={selectedProduct.baseName}
                className="modal-image"
              />
            </div>
            <div className="modal-details">
              <h3 className="modal-title">{selectedProduct.baseName}</h3>

              <div className="volume-selector">
                <label>Об'єм:</label>
                <select
                  className="volume-select"
                  onChange={(e) => {
                    const selected = selectedProduct.variants.find(
                      (v) => v.size === e.target.value
                    );
                    setSelectedPrice(selected.price);
                    setSelectedVolume(selected.size);
                  }}
                  value={selectedVolume}
                >
                  {selectedProduct.variants.map((variant, index) => (
                    <option key={index} value={variant.size}>
                      {variant.size} ({variant.price} ₴)
                    </option>
                  ))}
                </select>
              </div>

              <div className="price-section">
                <span className="price-label">Ціна:</span>
                <span className="modal-price">{selectedPrice} ₴</span>
              </div>

              <button className="buy-btn" onClick={addToBasket}>
                Додати до кошика
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Модалка підтвердження після додавання */}
      {showGoToCartModal && (
        <div className="confirmation-modal">
          <div className="confirmation-content">
            <h3>Товар додано до кошика!</h3>
            <p>Бажаєте перейти до кошика чи продовжити покупки?</p>

            <div className="confirmation-buttons">
              <button
                className="continue-shopping"
                onClick={() => setShowGoToCartModal(false)}
              >
                Продовжити покупки
              </button>

              <button
                className="go-to-cart"
                onClick={() => {
                  navigate("/basket");
                  setShowGoToCartModal(false);
                }}
              >
                Перейти до кошика ({cartItems.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
