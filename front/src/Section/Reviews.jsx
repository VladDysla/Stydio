import React from "react";
import Star from "../assents/images/star.png";
import subStar from "../assents/images/sub_star.png";

export default function Reviews() {
  return (
    <section id="reviews" className="reviews-sec">
      <div className="reviews-container">
        <div className="reviews-text">
          <h3>Відгуки</h3>
          <p>Відгуки поки що відсутні.</p>
        </div>
        <div className="reviews-banners">
          <div className="reviews-banner__star">
            <ul className="stars-ul">
              <li className="star-item">
                <img src={Star} alt="Зірка" />
              </li>
              <li className="star-item">
                <img src={Star} alt="Зірка" />
              </li>
              <li className="star-item">
                <img src={Star} alt="Зірка" />
              </li>
              <li className="star-item">
                <img src={Star} alt="Зірка" />
              </li>
              <li className="star-item">
                <img src={Star} alt="Зірка" />
              </li>
            </ul>
            <div className="reviews-line__average">
              <div className="reviews-line__average_icon">
                <img src={subStar} alt="Зірка" />
              </div>
              <b>5</b>
              <div className="reviews-avarage"></div>
              <b>0%</b>
            </div>
            <div className="reviews-line__average">
              <div className="reviews-line__average_icon">
                <img src={subStar} alt="Зірка" />
              </div>
              <b>4</b>
              <div className="reviews-avarage"></div>
              <b>0%</b>
            </div>
            <div className="reviews-line__average">
              <div className="reviews-line__average_icon">
                <img src={subStar} alt="Зірка" />
              </div>
              <b>3</b>
              <div className="reviews-avarage"></div>
              <b>0%</b>
            </div>
            <div className="reviews-line__average">
              <div className="reviews-line__average_icon">
                <img src={subStar} alt="Зірка" />
              </div>
              <b>2</b>
              <div className="reviews-avarage"></div>
              <b>0%</b>
            </div>
            <div className="reviews-line__average">
              <div className="reviews-line__average_icon">
                <img src={subStar} alt="Зірка" />
              </div>
              <b>1</b>
              <div className="reviews-avarage"></div>
              <b>0%</b>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
