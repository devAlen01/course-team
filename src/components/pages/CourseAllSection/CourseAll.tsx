"use client";

import React, { useState } from "react";
import scss from "./CourseAll.module.scss";

import styles from "./CourseAll.module.scss";
import CourseCard from "@/components/ui/CourseCard";
import { useGetAllCoursesQuery } from "@/redux/api/course";

const CourseAll = () => {
  const { data } = useGetAllCoursesQuery();
  const [activeButton, setActiveButton] = useState<string>("Все курсы");
  const [showMore, setShowMore] = useState<number>(6);

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  const filteredCourses =
    activeButton === "Все курсы"
      ? data
      : data?.filter((course) => course.category === activeButton);

  return (
    <div className={scss.courseAll}>
      <div className="container">
        <div className={scss.content}>
          <div className={styles.filter}>
            {[
              "Все курсы",
              "Управление компанией",
              "Командообразование",
              "Маркетинг",
              "Продажи",
              "IT",
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

          <div className={scss.items}>
            {filteredCourses?.slice(0, showMore).map((item) => (
              <div key={item.id}>
                <CourseCard
                  description={item.description}
                  title={item.title}
                  youtubeUrl={item.youtubeUrl}
                />
              </div>
            ))}
          </div>

          <div className={scss.show_more}>
            <p onClick={() => setShowMore(showMore + 6)}>Смотреть больше</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseAll;
