"use client";
import React, { useState } from "react";
import styles from "./Section5.module.scss";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";

const Section5 = () => {
  const reviews = [
    {
      name: "Viezh Robert",
      location: "Warsaw, Poland",
      text: "«Вау… Я очень рад использовать этот VPN, он оказался больше, чем мои ожидания, и до сих пор не было никаких проблем. (Название) всегда лучший».",
      avatar: "/assets/user1.png",
    },
    {
      name: "Yessica Christy",
      location: "Shanxi, China",
      text: "«Мне это нравится, потому что я люблю путешествовать далеко и все еще могу подключаться к высокой скорости».",
      avatar: "/assets/user2.png",
    },
    {
      name: "Kim Young Jou",
      location: "Seoul, South Korea",
      text: "«Это очень необычно для моего бизнеса, которому в настоящее время требуется виртуальная частная сеть с высоким уровнем безопасности».",
      avatar: "/assets/user3.png",
    },
    {
      name: "John Doe",
      location: "New York, USA",
      text: "«Просто потрясающий сервис, который значительно улучшил мои онлайн-проблемы с безопасностью. Рекомендую всем!»",
      avatar: "/assets/user4.png",
    },
    {
      name: "Anna Lee",
      location: "Tokyo, Japan",
      text: "«Отличное качество, хорошая скорость и без проблем. Лучший VPN-сервис, который я использовала!»",
      avatar: "/assets/user5.png",
    },
    {
      name: "Mikhail Ivanov",
      location: "Moscow, Russia",
      text: "«Отличный сервис, всегда работает стабильно и быстро. Подключение происходит за секунды.»",
      avatar: "/assets/user6.png",
    },
    {
      name: "Olivia Smith",
      location: "London, UK",
      text: "«Я использую этот сервис для работы и он очень удобный! Проблем с подключением никогда не было.»",
      avatar: "/assets/user7.png",
    },
    {
      name: "Lucas Brown",
      location: "Sydney, Australia",
      text: "«Супер! VPN работает идеально, и я могу смотреть свои любимые шоу в любое время!»",
      avatar: "/assets/user8.png",
    },
    {
      name: "Isabella Johnson",
      location: "Toronto, Canada",
      text: "«Я в восторге от этого сервиса, он обеспечивает высочайший уровень безопасности и удобства!»",
      avatar: "/assets/user9.png",
    },
    {
      name: "David Wilson",
      location: "Los Angeles, USA",
      text: "«С помощью этого VPN-сервиса я чувствую себя защищенно в интернете и не переживаю о своей безопасности.»",
      avatar: "/assets/user10.png",
    },
    {
      name: "Sophia Martinez",
      location: "Barcelona, Spain",
      text: "«Это отличный сервис для работы и личных нужд. У меня не было проблем с подключением!»",
      avatar: "/assets/user11.png",
    },
    {
      name: "Alexander Brown",
      location: "Berlin, Germany",
      text: "«Очень быстрый и надежный. Он также работает с ограничениями, которые бывают в разных странах.»",
      avatar: "/assets/user12.png",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex + 3 < reviews.length) {
      setCurrentIndex(currentIndex + 3);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 3);
    } else {
      setCurrentIndex(reviews.length - 3);
    }
  };

  return (
    <div className={styles.Section5}>
      <div className="container">
        <h1 className={styles.title}>
          Нам доверяют тысячи <br /> довольных учеников
        </h1>
        <p className={styles.description}>
          Мы предоставляем множество функций, которые вы можете использовать.
          Постепенное накопление информации
        </p>
        <div className={styles.cards}>
          {reviews
            .slice(currentIndex, currentIndex + 3)
            .map((review, index) => (
              <div key={index} className={styles.card}>
                <div className={styles.avatar}>
                  <img src={review.avatar} alt={`Avatar of ${review.name}`} />
                  <div className={styles.name}>
                    <h3>{review.name}</h3>
                    <span>{review.location}</span>
                  </div>
                </div>
                <p>{review.text}</p>
              </div>
            ))}
        </div>
        <div className={styles.navigation}>
          <div className={styles.circle}>
            <button onClick={handlePrev} className={styles.prevButton}>
              <FaArrowLeftLong />
            </button>
          </div>
          <div className={styles.circle}>
            <button onClick={handleNext} className={styles.nextButton}>
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section5;
