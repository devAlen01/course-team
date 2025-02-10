"use client";
import React, { useState } from "react";
import styles from "./Course.module.scss";
import Section5 from "./Home/Section5";
import { useGetAllCoursesQuery } from "@/redux/api/course";
import CourseCard from "../ui/CourseCard";
import { useRouter } from "next/navigation";

const Course = () => {
  const router = useRouter();
  const [activeButton, setActiveButton] = useState<string>("Все курсы");
  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };
  const { data } = useGetAllCoursesQuery();
  const filteredCourses =
    activeButton === "Все курсы"
      ? data
      : data?.filter((course) => course.category === activeButton);
  return (
    <div className={styles.Course}>
      <div className="container">
        <div className={styles.content1}>
          <div className={styles.left}>
            <h1>
              Развивайте свои навыки с <br /> помощью онлайн-курсов <br />с
              онлайн-обучением
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
            {[
              "Все курсы",
              "Управление компанией",
              "Командообразование",
              "Маркетинг",
              "Продажи",
            ].map((name) => (
              <span
                key={name}
                className={`${styles.filterButton} ${
                  activeButton === name ? styles.active : ""
                }`}
                onClick={() => handleButtonClick(name)}
              >
                {name}
              </span>
            ))}
          </div>
          <div className={styles.courses}>
            {filteredCourses?.slice(0, 8).map((item) => (
              <div className={styles.course} key={item.id}>
                <CourseCard
                  description={item.description}
                  title={item.title}
                  youtubeUrl={item.youtubeUrl}
                  price={item.price}
                  id={item.id}
                />
              </div>
            ))}
          </div>
          <div className={styles.show_more}>
            <p
              onClick={() => {
                router.push(`/courseAll`);
              }}
            >
              Смотреть больше
            </p>
          </div>
        </div>
      </div>
      <Section5 />
    </div>
  );
};

export default Course;
