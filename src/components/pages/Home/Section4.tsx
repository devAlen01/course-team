"use client";
import React from "react";
import styles from "./Section4.module.scss";
import CourseCard from "@/components/ui/CourseCard";
import { useGetAllCoursesQuery } from "@/redux/api/course";
import { useRouter } from "next/navigation";

const Section4 = () => {
  const { data } = useGetAllCoursesQuery();
  const router = useRouter();
  return (
    <div className={styles.Section4}>
      <div className="container">
        <h1 className={styles.title}>Доступные курсы</h1>
        <p className={styles.description}>
          Мы предоставляем множество функций, которые вы можете <br />{" "}
          использовать. Постепенное накопление информации.
        </p>
        <div className={styles.cards}>
          {data?.slice(0, 8).map((item) => (
            <div
              onClick={() => router.push(`/details/${item.id}`)}
              className={styles.course}
              key={item.id}
            >
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
  );
};

export default Section4;
