import React, { FC } from "react";
import scss from "./CourseStudent.module.scss";
import { IoClose, IoTimerOutline } from "react-icons/io5";
import { FaChevronRight, FaHeart, FaRegHeart } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorite, deleteFavorite } from "@/redux/createFavorite";
import getYouTubeID from "get-youtube-id";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import { useCourseUnenroolMutation } from "@/redux/api/course";

interface ICourse {
  title: string;
  youtubeUrl: string;
  description: string;
  price: string;
  id: string;
  enroolWindow: boolean;
  setEnroolWindow: React.Dispatch<React.SetStateAction<boolean>>;
}

const CourseStudent: FC<ICourse> = ({
  title,
  youtubeUrl,
  description,
  price,
  id,
  setEnroolWindow,
  enroolWindow,
}) => {
  const dispatch = useDispatch();
  const favorite = useSelector((s: RootState) => s.favorite.favorite);
  const someFavorite = favorite.some((item: { id: string }) => item.id === id);
  const videoId = getYouTubeID(youtubeUrl);
  const imgUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const router = useRouter();
  const [unenroolMutation] = useCourseUnenroolMutation();

  const unEnrool = (id: string) => {
    try {
      unenroolMutation(id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div key={id} className={scss.courses}>
        <div className={scss.course}>
          <img src={imgUrl} alt="img" className={scss.cardImage} />
          <button className={scss.btn1}>
            {Number(price) === 0 ? "Бесплатно" : `${price} сом`}
          </button>
          <IoClose
            onClick={() => setEnroolWindow(true)}
            className={scss.iconClose}
          />

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
      {enroolWindow && (
        <div className={scss.modalWindow}>
          <h1>Хочешь выйти из курса?</h1>
          <div className={scss.modalBtn}>
            <button onClick={() => setEnroolWindow(false)}>НЕТ</button>
            <button onClick={() => unEnrool(id)}>ДА</button>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseStudent;
