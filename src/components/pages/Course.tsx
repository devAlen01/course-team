"use client";
import React, { useState } from "react";
import styles from "./Course.module.scss";
import Image from "next/image";
import product1 from "../../../public/assets/product1.jpeg";
import product2 from "../../../public/assets/product2.jpeg";
import product3 from "../../../public/assets/product3.jpeg";
import product4 from "../../../public/assets/course1.jpg";
import product5 from "../../../public/assets/course2.jpg";
import product6 from "../../../public/assets/course3.jpg";
import Section5 from "./Home/Section5";

// Данные курсов
const courses = [
  { id: 1, title: "Как ставить задачи", description: "Мы ориентируемся на эргономику и эффективность.", image: product1, category: "Управление компанией" },
  { id: 2, title: "Тайм-менеджмент", description: "Управляйте временем эффективно.", image: product2, category: "Командообразование" },
  { id: 3, title: "Продажи", description: "Научитесь продавать больше.", image: product3, category: "Продажи" },
  { id: 4, title: "Маркетинг 101", description: "Основы маркетинга для бизнеса.", image: product4, category: "Маркетинг" },
  { id: 5, title: "Работа в команде", description: "Секреты успешной команды.", image: product5, category: "Командообразование" },
  { id: 6, title: "Стратегическое управление", description: "Развивайте навыки управления.", image: product6, category: "Управление компанией" },
];

const Course = () => {
  const [activeButton, setActiveButton] = useState<string>("Все курсы");

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  const filteredCourses =
    activeButton === "Все курсы"
      ? courses
      : courses.filter((course) => course.category === activeButton);

  return (
    <div className={styles.Course}>
      <div className="container">
        <div className={styles.content1}>
          <div className={styles.left}>
            <h1>
              Развивайте свои навыки с <br /> помощью онлайн-курсов <br />
              с онлайн-обучением
            </h1>
            <button className={styles.btn}>Присоединиться</button>
          </div>
          <div className={styles.right}></div>
        </div>
        <div className={styles.content2}>
          <h1 className={styles.title}>Популярные курсы</h1>
          <p className={styles.paragraph}>
            Мы предоставляем множество функций, которые вы можете <br />
            использовать. Постепенное накопление информации
          </p>
          <div className={styles.filter}>
            {["Все курсы", "Управление компанией", "Командообразование", "Маркетинг", "Продажи"].map((name) => (
              <span
                key={name}
                className={`${styles.filterButton} ${activeButton === name ? styles.active : ""
                  }`}
                onClick={() => handleButtonClick(name)}
              >
                {name}
              </span>
            ))}
          </div>
          <div className={styles.courses}>
            {filteredCourses.map((course) => (
              <div className={styles.course} key={course.id}>
                <Image src={course.image} alt={course.title} className={styles.cardImage} />
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{course.title}</h3>
                  <p className={styles.cardText}>{course.description}</p>
                  <button className={styles.cardButton}>Узнать больше</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Section5 />
    </div>
  );
};

export default Course;
