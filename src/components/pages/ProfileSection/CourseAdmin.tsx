"use client";

import React, { FC, useState } from "react";
import scss from "./CourseAdmin.module.scss";
import getYouTubeID from "get-youtube-id";
import { IoClose, IoTimerOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { FaChevronRight, FaHeart, FaRegHeart } from "react-icons/fa6";
import {
  useCourseDeleteMutation,
  useCourseUpdateMutation,
} from "@/redux/api/course";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { addToFavorite, deleteFavorite } from "@/redux/createFavorite";
interface ICourseUpdateProps {
  id: string;
  title: string;
  description: string;
  youtubeUrl: string;
  price: string;
}

interface ICourse {
  title: string;
  youtubeUrl: string;
  description: string;
  price: string;
  id: string;
}
const CourseAdmin: FC<ICourse> = ({
  title,
  youtubeUrl,
  description,
  price,
  id,
}) => {
  const videoId = getYouTubeID(youtubeUrl);
  const imgUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const router = useRouter();
  const [courseUpdateMutation] = useCourseUpdateMutation();
  const { register, handleSubmit } = useForm<ICourseUpdateProps>();
  const [courseDeleteMutation] = useCourseDeleteMutation();
  const [editCourse, setEditCourse] = useState<boolean>(false);
  const dispatch = useDispatch();
  const favorite = useSelector((s: RootState) => s.favorite.favorite);
  const someFavorite = favorite.some((item: { id: string }) => item.id === id);
  const deleteCourse = async (id: string) => {
    try {
      await courseDeleteMutation(id).unwrap();
      console.log("🚀 ~ deleteCourse ~ id:", id);
    } catch (error) {
      console.error("Kata", error);
    }
  };

  const handleUpdate: SubmitHandler<ICourseUpdateProps> = async (data) => {
    try {
      await courseUpdateMutation({
        id: id,
        title: data.title,
        youtubeUrl: data.youtubeUrl,
        description: data.description,
        price: data.price,
      });
      setEditCourse(false);
    } catch (error) {
      alert(error);
    }
  };

  if (editCourse) {
    return (
      <form
        className={scss.UpdateProfileForm}
        onSubmit={handleSubmit(handleUpdate)}
      >
        <div className={scss.textField}>
          <input
            id="title"
            type="text"
            {...register("title")}
            className="inputField"
            placeholder={`${title} - Введите имя`}
            defaultValue={title!}
          />
        </div>

        <div className={scss.textField}>
          <input
            id="youtubeUrl"
            type="text"
            {...register("youtubeUrl")}
            className="inputField"
            placeholder="Profile avatar URL"
            defaultValue={youtubeUrl!}
          />
        </div>

        <div className={scss.textField}>
          <input
            id="description"
            type="text"
            {...register("description")}
            className="inputField"
            placeholder="Profile avatar URL"
            defaultValue={description!}
          />
        </div>

        <div className={scss.textField}>
          <input
            id="price"
            type="number"
            {...register("price")}
            className="inputField"
            placeholder="Enter price"
            defaultValue={price!}
          />
        </div>

        <button type="submit" className={scss.submitButton}>
          Сохранить
        </button>
        <button
          className={scss.closeBtn}
          onClick={() => setEditCourse(!editCourse)}
        >
          Закрыть
        </button>
      </form>
    );
  }

  return (
    <div key={id} className={scss.courses}>
      <div className={scss.course}>
        <img
          onClick={() => setEditCourse(!editCourse)}
          src={imgUrl}
          alt="img"
          className={scss.cardImage}
        />
        <button className={scss.btn1}>
          {Number(price) === 0 ? "Бесплатно" : `${price} сом`}
        </button>
        <IoClose onClick={() => deleteCourse(id)} className={scss.iconClose} />
        <div className={scss.heartBlock}>
          {someFavorite ? (
            <FaHeart
              onClick={() => dispatch(deleteFavorite(id))}
              className={scss.heartIcon}
            />
          ) : (
            <FaRegHeart
              onClick={() =>
                dispatch(
                  addToFavorite({
                    id,
                    title,
                    youtubeUrl,
                    description,
                    price,
                  })
                )
              }
              className={scss.heartIcon1}
            />
          )}
        </div>
        <div className={scss.cardContent}>
          <h3 className={scss.cardTitle}>{title.slice(0, 30)}...</h3>
          <p className={scss.cardText}>{description}</p>
          <div className={scss.iconscalendr}>
            <p>
              <IoTimerOutline className={scss.icon} />
              <span> 22ч 30мин</span>
            </p>

            <p>
              <IoTimerOutline className={scss.icon} />
              <span>64 уроков</span>
            </p>

            <p>
              <IoTimerOutline className={scss.icon} />
              <span> Прогресс</span>
            </p>
          </div>
          <button
            className={scss.cardButton}
            onClick={() => router.push(`/details/${id}`)}
          >
            Узнать больше
            <FaChevronRight className={scss.rightIcon} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseAdmin;
