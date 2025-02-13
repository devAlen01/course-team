"use client";
import React, { useState } from "react";
import scss from "./Details.module.scss";
import marketingImg from "../../../assets/mar.png";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useCourseMyQuery, useGetAllCoursesQuery } from "@/redux/api/course";
import getYouTubeID from "get-youtube-id";

import ModalWindow from "./ModalWindow";
import { useGetMeQuery } from "@/redux/api/auth";

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

interface ICourse {
  id: string;
  title: string;
  description: string;
  youtubeUrl: string;
  price: string;
  category: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

const Details = () => {
  const { data: me } = useGetMeQuery();

  const [paymentWindow, setPaymentWindow] = useState<boolean>(false);
  const { data } = useGetAllCoursesQuery();
  const { data: courseMy } = useCourseMyQuery();
  const { id } = useParams();
  const router = useRouter();
  const filterDetails = data?.filter((item: Course) => item.id === id);

  const filterCom = data?.filter(
    (item: Course) => item.category === filterDetails?.[0]?.category
  );

  return (
    <div className={scss.Marketing1}>
      <div className="container">
        <div className={scss.content}>
          {filterDetails?.map((el) => {
            const videoId = getYouTubeID(el.youtubeUrl);
            const imgUrl = videoId
              ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
              : marketingImg;

            const isEnrolled =
              Number(el.price) === 0 ||
              me?.user.name === el.author.name ||
              (courseMy &&
                courseMy?.some((course: ICourse) => course.id === el.id));

            return (
              <div key={el.id} className={scss.block2}>
                <div className={scss.blockImgText}>
                  <Image
                    onClick={() => router.push(`/course/lesson/${el.id}`)}
                    src={imgUrl}
                    alt="marketingImg"
                    className={scss.img}
                    width={0}
                    height={0}
                  />
                  <button className={scss.btn1}>
                    {Number(el.price) === 0 ? "Бесплатно" : `${el.price} сом`}
                  </button>
                  <div className={scss.texts}>
                    <h1>{el.title}</h1>
                    <p>{el.description}</p>
                  </div>
                </div>
                <button
                  className={scss.btnCourse}
                  onClick={() => {
                    if (isEnrolled) {
                      router.push(`/course/lesson/${el.id}`);
                    } else {
                      setPaymentWindow(true);
                    }
                  }}
                >
                  {isEnrolled ? "Смотреть" : "Купить курс"}
                </button>
                {paymentWindow && (
                  <div className={scss.modalWindow}>
                    <ModalWindow
                      id={el.id}
                      paymentWindow={paymentWindow}
                      setPaymentWindow={setPaymentWindow}
                    />
                  </div>
                )}
              </div>
            );
          })}
          <div className={scss.block3}>
            {filterCom?.map((el) => {
              const videoId = getYouTubeID(el.youtubeUrl);
              const imgUrl = videoId
                ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
                : marketingImg;

              return (
                <div
                  onClick={() => router.push(`/details/${el.id}`)}
                  key={el.id}
                  className={scss.blockText}
                >
                  <Image
                    src={imgUrl}
                    alt="marketingImg"
                    className={scss.img}
                    width={0}
                    height={0}
                  />
                  <p>{el.title.slice(0, 25)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
