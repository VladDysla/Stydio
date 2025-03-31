import React, { useEffect, useState } from "react";
import Place from "../assents/images/place.jpg";
import Star from "../assents/images/star.png";
import Phone from "../assents/images/phone.png";
import subStar from "../assents/images/sub_star.png";

export default function Timetable() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const savedStats = localStorage.getItem("reviewsStats");
    if (savedStats) setStats(JSON.parse(savedStats));
  }, []);


  const phoneNumber = "0937561470";
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const Modal = () => (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Запис на послугу</h3>
        <p>Запис відбувається тільки через телефон</p>
        <button 
          className="modal-phone-btn"
          onClick={() => window.location.href = `tel:${phoneNumber}`}
        >
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
    <section className="timetable-sec" id="location">
      <div className="timetable-container">
        <div className="timetable-photo">
          <img src={Place} alt="Фото салону краси" />
        </div>
        <div className="timetable-desc">
          <div className="timetable-open__flex">
            <div className="timetable-open__dote"></div>
            <p className="toptitle">Зараз відчинено</p>
          </div>
          <h2>Beauty Studio</h2>
          <p className="timetable-subtitle">
            вулиця Данила Щербаківського 4, Київ, 03190, Україна
          </p>
          {stats ? (
            <div>
              <div className="stars-ul">
                {[1, 2, 3, 4, 5].map((star) => (
                  <img
                    key={star}
                    src={star <= stats.roundedAverage ? subStar : Star}
                    alt="Зірка"
                    className="review-star"
                  />
                ))}
              </div>
            </div>
          ) : (
            <div>Данные рейтинга загружаются...</div>
          )}
          <div className="timetable-phone__flex">
            <div className="timetable-phone_icon">
              <img src={Phone} alt="Телефон" />
            </div>
            <p>+380 93 756 1470</p>
          </div>
          <div className="timetable__block">
            <div className="timetable__line">
              <div className="timetable__line_flex">
                <div className="timetable-open__dote"></div>
                <p className="timetable__day">Понеділок</p>
              </div>
              <p className="timetable__time">09:00 - 18:00</p>
            </div>
            <div className="timetable__line">
              <div className="timetable__line_flex">
                <div className="timetable-open__dote"></div>
                <p className="timetable__day">Вівторок</p>
              </div>
              <p className="timetable__time">09:00 - 18:00</p>
            </div>
            <div className="timetable__line">
              <div className="timetable__line_flex">
                <div className="timetable-open__dote"></div>
                <p className="timetable__day">Середа</p>
              </div>
              <p className="timetable__time">09:00 - 18:00</p>
            </div>
            <div className="timetable__line">
              <div className="timetable__line_flex">
                <div className="timetable-open__dote"></div>
                <p className="timetable__day">Четвер</p>
              </div>
              <p className="timetable__time">09:00 - 18:00</p>
            </div>
            <div className="timetable__line">
              <div className="timetable__line_flex">
                <div className="timetable-open__dote"></div>
                <p className="timetable__day">П'ятниця</p>
              </div>
              <p className="timetable__time">09:00 - 18:00</p>
            </div>
            <div className="timetable__line">
              <div className="timetable__line_flex">
                <div className="timetable-close__dote"></div>
                <p className="timetable__day">Субота</p>
              </div>
              <p className="timetable__time">Зачинено</p>
            </div>
            <div className="timetable__line">
              <div className="timetable__line_flex">
                <div className="timetable-close__dote"></div>
                <p className="timetable__day">Неділя</p>
              </div>
              <p className="timetable__time">Зачинено</p>
            </div>
          </div>
          <div className="timetable-btns">
            {/* 1. Кнопка "Записатися" - светло-фиолетовая */}
            <button
              className="timetable-btn timetable-btn--purple"
              aria-label="Записатися на прийом"
              onClick={() => setIsModalOpen(true)}
            >
              Записатися
            </button>

            {/* 2. Кнопка "Маршрут" - светло-серая */}
            <button
              className="timetable-btn timetable-btn--gray"
              aria-label="Показати маршрут"
              onClick={() => {
                const address = encodeURIComponent(
                  "вулиця Данила Щербаківського 4"
                );
                window.open(
                  `https://www.google.com/maps/dir/?api=1&destination=${address}`
                );
              }}
            >
              Маршрут
            </button>

            {/* 3. Кнопка "Телефон" - светло-серая */}
            <button
              className="timetable-btn timetable-btn--gray"
              aria-label="Зателефонувати"
              onClick={() => (window.location.href = "tel:+380123456789")} // Замените на реальный номер
            >
              Телефон
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && <Modal />}
    </section>
  );
}
