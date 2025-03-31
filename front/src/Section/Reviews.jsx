import React, { useEffect, useState } from "react";
import Star from "../assents/images/star.png";
import subStar from "../assents/images/sub_star.png";
// import defaultAvatar from "../assents/images/default-avatar.png"; // Добавьте дефолтный аватар

export default function Reviews() {
  // Состояния для формы
  const [formData, setFormData] = useState({
    name: "",
    review: "",
    rating: 0,
  });

  // Загрузка отзывов из localStorage при монтировании компонента
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

  const handleAdminDelete = () => {
    const reviewId = Number(window.prompt("Введите ID отзыва для удаления:"));
    if (!reviewId || isNaN(reviewId)) return;

    const confirmDelete = window.confirm(`Удалить отзыв с ID ${reviewId}?`);
    if (confirmDelete) {
      setReviews(reviews.filter((review) => review.id !== reviewId));
    }
  };

  console.log("reviews:", reviews);
  // Обработчики изменений
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (selectedRating) => {
    setFormData((prev) => ({ ...prev, rating: selectedRating }));
  };

  // Отправка формы
  // Сохранение отзывов в localStorage при их изменении
  useEffect(() => {
    localStorage.setItem("savedReviews", JSON.stringify(reviews));
  }, [reviews]);

  // Остальной код остается без изменений...
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.review || !formData.rating) {
      alert("Будь ласка, заповніть всі обов'язкові поля");
      return;
    }

    // Сохраняем имя гостя в localStorage
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

    // Сброс формы
    setFormData({
      name: "",
      review: "",
      rating: 0,
    });
  };

  // Удаление отзыва
  const handleDeleteReview = (reviewId, userToken) => {
    // Для гостей используем имя из localStorage или prompt
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

    if (!currentUserToken) return; // Пользователь отменил ввод имени

    if (userToken === currentUserToken) {
      setReviews(reviews.filter((review) => review.id !== reviewId));
    } else {
      alert("Ви можете видаляти лише свої відгуки");
    }
  };
  // Расчет статистики
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
      roundedAverage: Math.round(averageRating), // Добавляем округленное значение
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
          <button
            onClick={handleAdminDelete}
            style={{ background: "#ff4444", color: "white", marginTop: "10px" }}
          >
            Удалить любой отзыв (админ)
          </button>
          <h3>Відгуки</h3>

          {/* Форма для отзыва */}
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

          {/* Список отзывов */}
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
                  >
                    ×
                  </button>
                </div>
                <p className="review-content">{review.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Блок с рейтингом */}
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

            {/* <ul className="stars-ul">
              {[1, 2, 3, 4, 5].map((star) => (
                <li key={star} className="star-item">
                  <img src={Star} alt="Зірка" />
                </li>
              ))}
            </ul> */}

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
