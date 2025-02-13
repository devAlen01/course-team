"use client";
import React from "react";
import scss from "./Lesson.module.scss";
import { FaChevronLeft } from "react-icons/fa6";
import { PiSmileyLight } from "react-icons/pi";
import { BsReply } from "react-icons/bs";
import { useParams, useRouter } from "next/navigation";
import { useGetAllCoursesQuery, useReviewMutation } from "@/redux/api/course";
import { SubmitHandler, useForm } from "react-hook-form";

const Lesson = () => {
  function formatTimeAgo(createdAt: string): string {
    const postDate = new Date(createdAt);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
    if (years > 0) {
      return `${years} г. назад`;
    } else if (months > 0) {
      return `${months} м. назад`;
    } else if (days > 0) {
      return `${days} д. назад`;
    } else if (hours > 0) {
      return `${hours} ч. назад`;
    } else if (minutes > 0) {
      return `${minutes} мин. назад`;
    } else {
      return "сейчас";
    }
  }

  const { id } = useParams();
  const { data } = useGetAllCoursesQuery();
  const [reviewMutation] = useReviewMutation();
  const filterLesson = data?.find((item: Course) => item.id === id);
  const router = useRouter();
  const embedUrl = filterLesson?.youtubeUrl.replace("watch?v=", "embed/");
  const { register, handleSubmit, reset } = useForm<COURSE.ReviewRequest>();
  const sendMessage: SubmitHandler<COURSE.ReviewRequest> = async (
    data: COURSE.ReviewRequest
  ) => {
    const message = {
      courseId: String(filterLesson?.id),
      review: data.review,
    };

    if (!message.review.trim()) {
      return null;
    }
    await reviewMutation(message);
    reset();
  };
  return (
    <div className={scss.Lesson}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.blockLesson}>
            <div className={scss.iconText}>
              <a onClick={() => router.push(`/courseAll`)}>
                <FaChevronLeft className={scss.icon} />
              </a>
              <p>{filterLesson?.title}</p>
            </div>
            <div className={scss.block}>
              <div className={scss.coursesImg}>
                <div key={filterLesson?.id} className={scss.coursesImg}>
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
                      {/* <span>{formatDate(filterLesson?.createdAt!)}</span> */}
                      <span>1430 просмотров</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={scss.blockChat}>
            <hr />
            <div className={scss.blockInputText}>
              <div className={scss.block}>
                {filterLesson?.reviews &&
                  filterLesson?.reviews.map((el, idx) => (
                    <div key={idx} className={scss.blockImage}>
                      <img src={el.user.avatarUrl} alt="user" key={idx} />
                      <div className={scss.textAll}>
                        <h1>
                          {el.user.name}{" "}
                          {/* <span>{formatTimeAgo(el.createdAt)}. назад</span> */}
                        </h1>
                        <p>{el?.review}</p>
                        <div className={scss.iconsText}>
                          <a>
                            <BsReply className={scss.icon} />
                            <span className={scss.span11}>Ответить</span>
                          </a>
                          <p>{formatTimeAgo(el.createdAt)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className={scss.blockInput}>
                <form onSubmit={handleSubmit(sendMessage)}>
                  <input
                    {...register("review", { required: true })}
                    type="text"
                    placeholder="Комментировать..."
                  />
                </form>
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
