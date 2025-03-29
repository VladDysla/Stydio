import React from "react";
import Place from "../assents/images/place.jpg";
import Star from "../assents/images/star.png";
import Phone from "../assents/images/phone.png";

export default function Timetable() {
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
          <ul className="stars-ul">
            <li className="star-item">
              <img src={Star} alt="Зірка рейтингу" />
            </li>
            <li className="star-item">
              <img src={Star} alt="Зірка рейтингу" />
            </li>
            <li className="star-item">
              <img src={Star} alt="Зірка рейтингу" />
            </li>
            <li className="star-item">
              <img src={Star} alt="Зірка рейтингу" />
            </li>
            <li className="star-item">
              <img src={Star} alt="Зірка рейтингу" />
            </li>
          </ul>
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
            <button aria-label="Кнопка дії"></button>
            <button aria-label="Кнопка дії"></button>
            <button aria-label="Кнопка дії"></button>
          </div>
        </div>
      </div>
    </section>
  );
}
