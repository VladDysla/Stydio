import React, { useEffect, useState } from "react";
import Star from "../assents/images/star.png";
import subStar from "../assents/images/sub_star.png";

export default function Reviews() {
  const [formData, setFormData] = useState({
    name: "",
    review: "",
    rating: 0,
  });

  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem("savedReviews");
    return savedReviews
      ? JSON.parse(savedReviews)
      : [
          {
            id: 1,
            name: "Анна К.",
            text: "Чудовий сервіс! Майстер дуже уважний, все зробили акуратно і без болю. Рекомендую цей салон всім своїм друзям.",
            rating: 5,
            date: "15.02.2025",
            userToken: "guest_Анна К.",
          },
        ];
  });

  const [adminMode, setAdminMode] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  // Активация админ-режима по тройному клику на заголовок
  const handleAdminActivation = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    if (newCount === 3) {
      const password = prompt("Введите пароль админа:");
      if (password === "12345") { // Простой пароль, можно изменить
        setAdminMode(true);
        alert("Админ-режим активирован");
      } else {
        alert("Неверный пароль");
      }
      setClickCount(0);
    }

    // Сброс счетчика через 1 секунду
    setTimeout(() => {
      if (clickCount > 0) {
        setClickCount(0);
      }
    }, 1000);
  };

  const handleAdminDelete = (reviewId) => {
    const confirmDelete = window.confirm(`Удалить отзыв с ID ${reviewId}?`);
    if (confirmDelete) {
      setReviews(reviews.filter((review) => review.id !== reviewId));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (selectedRating) => {
    setFormData((prev) => ({ ...prev, rating: selectedRating }));
  };

  useEffect(() => {
    localStorage.setItem("savedReviews", JSON.stringify(reviews));
  }, [reviews]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.review || !formData.rating) {
      alert("Будь ласка, заповніть всі обов'язкові поля");
      return;
    }

    if (!localStorage.getItem("userToken")) {
      localStorage.setItem("guestName", formData.name);
    }

    const newReview = {
      id: Date.now(),
      name: formData.name,
      text: formData.review,
      rating: formData.rating,
      date: new Date().toLocaleDateString("uk-UA"),
      userToken: localStorage.getItem("userToken") || `guest_${formData.name}`,
    };

    setReviews((prev) => [newReview, ...prev]);
    setFormData({
      name: "",
      review: "",
      rating: 0,
    });
  };

  const handleDeleteReview = (reviewId, userToken) => {
    const getGuestToken = () => {
      const guestName =
        localStorage.getItem("guestName") ||
        prompt("Введіть ваше ім'я, щоб підтвердити авторство");
      if (!guestName) return null;
      localStorage.setItem("guestName", guestName);
      return `guest_${guestName}`;
    };

    const currentUserToken =
      localStorage.getItem("userToken") || getGuestToken();

    if (!currentUserToken) return;

    if (userToken === currentUserToken || adminMode) {
      setReviews(reviews.filter((review) => review.id !== reviewId));
    } else {
      alert("Ви можете видаляти лише свої відгуки");
    }
  };

  const calculateStats = () => {
    const total = reviews.length;
    if (total === 0) return null;
  
    const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    let totalRating = 0;
  
    reviews.forEach((review) => {
      ratingCounts[review.rating]++;
      totalRating += review.rating;
    });
  
    const averageRating = totalRating / total;
  
    return {
      averageRating,
      roundedAverage: Math.round(averageRating),
      ratingPercentages: {
        1: Math.round((ratingCounts[1] / total) * 100),
        2: Math.round((ratingCounts[2] / total) * 100),
        3: Math.round((ratingCounts[3] / total) * 100),
        4: Math.round((ratingCounts[4] / total) * 100),
        5: Math.round((ratingCounts[5] / total) * 100),
      },
    };
  };

  const stats = calculateStats();

  useEffect(() => {
    const stats = calculateStats();
    localStorage.setItem('reviewsStats', JSON.stringify(stats));
  }, [reviews]);

  return (
    <section id="reviews" className="reviews-sec">
      <div className="reviews-container">
        <div className="reviews-text">
          {adminMode && (
            <div className="admin-panel" style={{
              background: "#f8f8f8",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "15px",
              border: "1px solid #ff4444"
            }}>
              <p style={{ color: "#ff4444", margin: "0 0 10px 0" }}>Админ-режим</p>
              <button
                onClick={() => setAdminMode(false)}
                style={{ 
                  background: "#ff4444", 
                  color: "white", 
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                Выйти
              </button>
            </div>
          )}
          
          <h3 onClick={handleAdminActivation} style={{ cursor: "pointer" }}>Відгуки</h3>

          <form className="review-form" onSubmit={handleSubmit}>
            <h4>Залишити відгук</h4>

            <div className="form-group">
              <label htmlFor="name">Ваше ім'я*</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Введіть ваше ім'я"
                className="review-input"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Ваша оцінка*</label>
              <div className="rating-input">
                {[1, 2, 3, 4, 5].map((star) => (
                  <img
                    key={star}
                    src={star <= formData.rating ? subStar : Star}
                    alt={`Оцінка ${star}`}
                    className="rating-star"
                    onClick={() => handleRatingChange(star)}
                  />
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="review">Ваш відгук*</label>
              <textarea
                id="review"
                name="review"
                placeholder="Напишіть ваш відгук..."
                className="review-textarea"
                value={formData.review}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-review-btn">
              Надіслати відгук
            </button>
            <p className="required-hint">* Обов'язкові поля</p>
          </form>

          <div className="reviews-list">
            {reviews.map((review) => (
              <div key={review.id} className="review-item">
                <div className="review-header">
                  <div className="review-user">
                    <h5>{review.name}</h5>
                    <div className="review-stars">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <img
                          key={star}
                          src={star <= review.rating ? subStar : Star}
                          alt="Зірка"
                          className="review-star"
                        />
                      ))}
                    </div>
                  </div>
                  <span className="review-date">{review.date}</span>
                  <button
                    className="delete-review-btn"
                    onClick={() =>
                      handleDeleteReview(review.id, review.userToken)
                    }
                    style={{
                      fontSize: "18px",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: adminMode ? "#ff4444" : "#999",
                      fontWeight: adminMode ? "bold" : "normal"
                    }}
                  >
                    ×
                  </button>
                  {adminMode && (
                    <span style={{ 
                      marginLeft: "10px", 
                      fontSize: "12px",
                      color: "#666"
                    }}>
                      ID: {review.id}
                    </span>
                  )}
                </div>
                <p className="review-content">{review.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="reviews-banners">
          <div className="reviews-banner__star">
            <div className="rating-summary">
              <h4>Рейтинг</h4>
              {stats ? (
                <>
                  <div className="average-rating">
                    Середня оцінка: <strong>{stats.roundedAverage}</strong>/5
                  </div>
                  <div className="total-reviews">
                    Всього відгуків: <strong>{reviews.length}</strong>
                  </div>
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
                </>
              ) : (
                <p>Ще немає відгуків</p>
              )}
            </div>

            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="reviews-line__average">
                <div className="reviews-line__average_icon">
                  <img src={subStar} alt="Зірка" />
                </div>
                <b>{rating}</b>
                <div className="reviews-avarage">
                  <div
                    className="rating-progress"
                    style={{
                      width: stats
                        ? `${stats.ratingPercentages[rating]}%`
                        : "0%",
                    }}
                  ></div>
                </div>
                <b>{stats ? `${stats.ratingPercentages[rating]}%` : "0%"}</b>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}