"use client";
import React from "react";
import scss from "./Lesson.module.scss";
import { FaChevronLeft } from "react-icons/fa6";
import { PiSmileyLight } from "react-icons/pi";
import Image from "next/image";
import user from "../../../assets/Ellipse 3.png";
import user1 from "../../../assets/Ellipse 3 (1).png";
import { BsReply } from "react-icons/bs";
import { useParams, useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
import { useGetAllCoursesQuery } from "@/redux/api/course";

interface Course {
  id: string;
  title: string;
  description: string;
  youtubeUrl: string;
  price: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
}

const Lesson = () => {
  const formatDate = (date: string) => {
    let distance = formatDistanceToNow(new Date(date), {
      addSuffix: true,
      locale: ru,
    });

    distance = distance.replace("назад", "").trim();
    distance = distance.replace("около", "").trim();

    if (distance.includes("минут")) {
      return distance.replace("минут", "мин");
    }
    if (distance.includes("час")) {
      return distance.replace("часов", "ч.").replace("час", "ч.");
    }
    if (distance.includes("день") || distance.includes("дней")) {
      return distance.replace("день", "дн").replace("дней", "дн");
    }
    if (distance.includes("недел")) {
      return distance.replace("недели", "нед").replace("неделя", "нед");
    }
    if (distance.includes("месяц")) {
      return distance.replace("месяцев", "мес").replace("месяца", "мес");
    }

    return distance;
  };
  const imgs = [user, user1, user, user1, user, user1, user, user1];
  const { id } = useParams();
  const { data } = useGetAllCoursesQuery();
  const filterLesson = data?.filter((item: Course) => item.id === id);
  const router = useRouter();
  return (
    <div className={scss.Lesson}>
      <div className="container">
        <div className={scss.content}>
          {filterLesson?.map((el: Course) => {
            const embedUrl = el.youtubeUrl.replace("watch?v=", "embed/");
            return (
              <div className={scss.blockLesson}>
                <div className={scss.iconText}>
                  <a onClick={() => router.push(`/courseAll`)}>
                    <FaChevronLeft className={scss.icon} />
                  </a>
                  <p>{el.title}</p>
                </div>
                <div className={scss.block}>
                  <div className={scss.coursesImg}>
                    <div key={el.id} className={scss.coursesImg}>
                      <iframe
                        src={embedUrl}
                        className={scss.img}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                      <div className={scss.blockText}>
                        <div className={scss.btnText}>
                          <h4>Как ставить и оценивать задачи</h4>
                          <button>Поделиться</button>
                        </div>
                        <div className={scss.span}>
                          <span>{formatDate(el.createdAt)}</span>
                          <span>1430 просмотров</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div className={scss.blockChat}>
            <hr />
            <div className={scss.blockInputText}>
              <div className={scss.block}>
                {imgs.map((el, idx) => (
                  <div key={idx} className={scss.blockImage}>
                    <Image src={el} alt="user" key={idx} />
                    <div className={scss.textAll}>
                      <h1>
                        Ира <span>12:03</span>
                      </h1>
                      <p>Крутой урок мне понравилось</p>
                      <div className={scss.iconsText}>
                        <a>
                          <BsReply className={scss.icon} />
                          <span className={scss.span11}>Ответить</span>
                        </a>
                        <p>2 часа назад</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className={scss.blockInput}>
                <input type="text" placeholder="Комментировать..." />
                <PiSmileyLight className={scss.icon} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lesson;
