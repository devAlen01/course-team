import React, { FC } from "react";
import scss from "./CourseCard.module.scss";

import getYouTubeID from "get-youtube-id";

const CourseCard: FC<Pick<Course, "youtubeUrl" | "description" | "title">> = ({
  description,
  title,
  youtubeUrl,
}) => {
  const videoId = getYouTubeID(youtubeUrl);
  const imgUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  return (
    <div className={scss.courses}>
      <div className={scss.course}>
        <img src={imgUrl} alt={"img"} className={scss.cardImage} />
        <div className={scss.cardContent}>
          <h3 className={scss.cardTitle}>{title}</h3>
          <p className={scss.cardText}>{description}</p>
          <button className={scss.cardButton}>Узнать больше</button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
