import React, { useEffect, useState } from "react";
import "./section.css";
import Vosk from "../assents/images/vosk.jpg";
import Electro from "../assents/images/electro.jpg"; // Додайте нове зображення для електроепіляції

export default function Services() {
  const [activeButton, setActiveButton] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const phoneNumber = "0937561470";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://stydio-j4mn.onrender.com/api/beauty");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setServices(result);
        setFilteredServices(
          result.filter((service) => service.name.includes("Воскова"))
        );
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (activeButton === 1) {
      setFilteredServices(
        services.filter((service) => service.name.includes("Воскова"))
      );
    } else if (activeButton === 2) {
      setFilteredServices(
        services.filter((service) => service.name.includes("Електро"))
      );
    } else if (activeButton === 3) {
      setFilteredServices(
        services.filter((service) => service.name.includes("Комплекс"))
      );
    }
  }, [activeButton, services]);

  // Функція для вибору зображення в залежності від типу послуги
  const getServiceImage = (serviceName) => {
    return serviceName.includes("Електро") ? Electro : Vosk;
  };

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

  return (
    <section className="service-sec" id="services">
      <div className="service-container">
        <h3>Послуги</h3>

        <div className="service-sort">
          <button
            onClick={() => setActiveButton(1)}
            className={`service-tab ${activeButton === 1 ? "active" : ""}`}
          >
            Воскова епіляція
          </button>
          <button
            onClick={() => setActiveButton(2)}
            className={`service-tab ${activeButton === 2 ? "active" : ""}`}
          >
            Електроепіляція
          </button>
          <button
            onClick={() => setActiveButton(3)}
            className={`service-tab ${activeButton === 3 ? "active" : ""}`}
          >
            Комплекси
          </button>
        </div>

        <div className="services-list">
          {filteredServices.map((service) => (
            <React.Fragment key={service._id}>
              <div className="service-card">
                <div className="service-content">
                  <div className="service-image">
                    <img
                      src={getServiceImage(service.name)}
                      alt={service.name}
                    />
                  </div>
                  <div className="service-info">
                    <h4>{service.name}</h4>
                    <div className="service-meta">
                      <span className="service-time">{service.time} хв</span>
                      <p className="service-price"> {service.cost} грн</p>
                    </div>
                  </div>
                </div>
                <button
                  className="service-book-btn"
                  onClick={() => setIsModalOpen(true)}
                >
                  Записатися
                </button>
              </div>
              <div className="service-divider"></div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {isModalOpen && <Modal />}
    </section>
  );
}
