"use client";

import React, { FC } from "react";
import scss from "./CourseCard.module.scss";

import getYouTubeID from "get-youtube-id";
import { IoTimerOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { addToFavorite, deleteFavorite } from "@/redux/createFavorite";

const CourseCard: FC<
  Pick<Course, "youtubeUrl" | "description" | "title" | "price" | "id">
> = ({ description, title, youtubeUrl, price, id }) => {
  const videoId = getYouTubeID(youtubeUrl);
  const imgUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const router = useRouter();
  const dispatch = useDispatch();
  const favorite = useSelector((s: RootState) => s.favorite.favorite);
  const someFavorite = favorite.some((item: { id: string }) => item.id === id);

  return (
    <div className={scss.courses}>
      <div className={scss.course}>
        <img src={imgUrl} alt={"img"} className={scss.cardImage} />
        <button className={scss.btn1}>
          {Number(price) === 0 ? "Бесплатно" : `${price} сом`}
        </button>
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
          <h3 className={scss.cardTitle}>
            {title.length > 26 ? `${title.slice(0, 26)}...` : title}
          </h3>
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
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
