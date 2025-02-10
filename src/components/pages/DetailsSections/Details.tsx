"use client";
import React, { useState } from "react";
import scss from "./Details.module.scss";
import marketingImg from "../../../assets/mar.png";
import Image from "next/image";
import {
  MdHealthAndSafety,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";
import { useParams, useRouter } from "next/navigation";
import { useGetAllCoursesQuery } from "@/redux/api/course";
import getYouTubeID from "get-youtube-id";
import { IoClose } from "react-icons/io5";
import { PiLockSimpleFill } from "react-icons/pi";

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

const Details = () => {
  const [paymentWindow, setPaymentWindow] = useState<boolean>(false);
  const { data } = useGetAllCoursesQuery();
  const { id } = useParams();
  const router = useRouter();
  const filterDetails = data?.filter((item: Course) => item.id === id);
  const [modalWindow1, setModalWindow1] = useState(false);
  const [modalWindow2, setModalWindow2] = useState(false);
  const [modalWindow3, setModalWindow3] = useState(false);
  const [modalWindow4, setModalWindow4] = useState(false);
  const filterCom = data?.filter(
    (item: Course) => item.category === "Командообразование"
  );
  const filterComPan = data?.filter(
    (item: Course) => item.category === "Управление компанией"
  );
  const filterMarketing = data?.filter(
    (item: Course) => item.category === "Маркетинг"
  );
  const filterIT = data?.filter((item: Course) => item.category === "IT");

  return (
    <div className={scss.Marketing1}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.block1}>
            <p onClick={() => router.push(`/courseAll`)} className={scss.p}>
              назад
            </p>
            <div className={scss.text}>
              <h1>Маркетинг</h1>
              <p>
                Мы предоставляем множество функций, которые вы можете
                использовать. Постепенное накопление информация{" "}
              </p>
            </div>
            <div></div>
          </div>
          {filterDetails?.map((el) => {
            const videoId = getYouTubeID(el.youtubeUrl);
            const imgUrl = videoId
              ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
              : marketingImg;

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
                {Number(el.price) === 0 ? null : (
                  <button onClick={() => setPaymentWindow(true)}>
                    Купить курс
                  </button>
                )}
                {paymentWindow ? (
                  <div className={scss.modalWindow}>
                    <div className={scss.bg}></div>
                    <div className={scss.blockWindow}>
                      <IoClose />
                      <div className={scss.saveText}>
                        <div className={scss.saveIcons}>
                          <MdHealthAndSafety />
                          <PiLockSimpleFill />
                        </div>
                        <h5>Безопасная оплата</h5>
                      </div>
                      <div className={scss.card}>
                        <p>КРЕДИТНАЯ / ДЕБЕТОВАЯ КАРТА</p>
                      </div>
                      <div className={scss.blockInputs}>
                        <p>Выберите метод оплаты</p>
                        <select>
                          <option value="">Visa/MasterCard / Amex /JCB</option>
                          <option value="">Visa/MasterCard / Amex /JCB</option>
                          <option value="">Visa/MasterCard / Amex /JCB</option>
                          <option value="">Visa/MasterCard / Amex /JCB</option>
                          <option value="">Visa/MasterCard / Amex /JCB</option>
                        </select>
                        <div className={scss.blockInput1}>
                          <div className={scss.inputCardName}>
                            <p>
                              Имя владельца карты <span>*</span>
                            </p>
                            <input type="text" />
                          </div>
                          <div className={scss.inputCardNumber}>
                            <p>
                              Номер кредитной/дебетовой карты <span>*</span>
                            </p>
                            <input type="text" />
                          </div>
                        </div>
                        <div className={scss.blockInput1}>
                          <div className={scss.inputCardName}>
                            <p>
                              Дата истечения срока действия <span>*</span>
                            </p>
                            <input type="text" placeholder="MM/YY" />
                          </div>
                          <div className={scss.inputCardNumber}>
                            <p>
                              CVC/CVV <span>*</span>
                            </p>
                            <input type="text" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
          <div className={scss.block3}>
            <hr />
            <div className={scss.text}>
              <p>Урок 1 : Ознакомление</p>
              {modalWindow1 ? (
                <MdKeyboardArrowDown
                  onClick={() => setModalWindow1(false)}
                  className={scss.iconDown}
                />
              ) : (
                <MdKeyboardArrowUp
                  onClick={() => {
                    setModalWindow1(true);
                    setModalWindow2(false);
                    setModalWindow3(false);
                    setModalWindow4(false);
                  }}
                  className={scss.iconUp}
                />
              )}
            </div>
            {modalWindow1 ? (
              <div className={scss.blockText1}>
                {filterCom?.map((el) => {
                  const videoId = getYouTubeID(el.youtubeUrl);
                  const imgUrl = videoId
                    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
                    : marketingImg;
                  return (
                    <div className={scss.block33}>
                      <Image
                        onClick={() => router.push(`/details/${el.id}`)}
                        src={imgUrl}
                        alt="marketingImg"
                        className={scss.img11}
                        width={0}
                        height={0}
                      />
                      <p>{el.title.slice(0, 20)}</p>
                    </div>
                  );
                })}
              </div>
            ) : null}
            <hr />
            <div className={scss.text}>
              <p>Урок 2 : Методы бизнеса</p>
              {modalWindow2 ? (
                <MdKeyboardArrowDown
                  onClick={() => setModalWindow2(false)}
                  className={scss.iconDown}
                />
              ) : (
                <MdKeyboardArrowUp
                  onClick={() => {
                    setModalWindow2(true);
                    setModalWindow1(false);
                    setModalWindow3(false);
                    setModalWindow4(false);
                  }}
                  className={scss.iconUp}
                />
              )}
            </div>
            {modalWindow2 ? (
              <div className={scss.blockText1}>
                {filterComPan?.map((el) => {
                  const videoId = getYouTubeID(el.youtubeUrl);
                  const imgUrl = videoId
                    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
                    : marketingImg;
                  return (
                    <div className={scss.block33}>
                      <Image
                        onClick={() => router.push(`/details/${el.id}`)}
                        src={imgUrl}
                        alt="marketingImg"
                        className={scss.img11}
                        width={0}
                        height={0}
                      />
                      <p>{el.title.slice(0, 20)}</p>
                    </div>
                  );
                })}
              </div>
            ) : null}
            <hr />
            <div className={scss.text}>
              <p>Урок 3 : Как начать зарабатывать больше</p>
              {modalWindow3 ? (
                <MdKeyboardArrowDown
                  onClick={() => setModalWindow3(false)}
                  className={scss.iconDown}
                />
              ) : (
                <MdKeyboardArrowUp
                  onClick={() => {
                    setModalWindow3(true);
                    setModalWindow2(false);
                    setModalWindow1(false);
                    setModalWindow4(false);
                  }}
                  className={scss.iconUp}
                />
              )}
            </div>
            {modalWindow3 ? (
              <div className={scss.blockText1}>
                {filterMarketing?.map((el) => {
                  const videoId = getYouTubeID(el.youtubeUrl);
                  const imgUrl = videoId
                    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
                    : marketingImg;
                  return (
                    <div className={scss.block33}>
                      <Image
                        onClick={() => router.push(`/details/${el.id}`)}
                        src={imgUrl}
                        alt="marketingImg"
                        className={scss.img11}
                        width={0}
                        height={0}
                      />
                      <p>{el.title.slice(0, 20)}</p>
                    </div>
                  );
                })}
              </div>
            ) : null}
            <hr />
            <div className={scss.text}>
              <p>Урок 4 : Заключение</p>
              {modalWindow4 ? (
                <MdKeyboardArrowDown
                  onClick={() => setModalWindow4(false)}
                  className={scss.iconDown}
                />
              ) : (
                <MdKeyboardArrowUp
                  onClick={() => {
                    setModalWindow4(true);
                    setModalWindow2(false);
                    setModalWindow3(false);
                    setModalWindow1(false);
                  }}
                  className={scss.iconUp}
                />
              )}
            </div>
            {modalWindow4 ? (
              <div className={scss.blockText1}>
                {filterIT?.map((el) => {
                  const videoId = getYouTubeID(el.youtubeUrl);
                  const imgUrl = videoId
                    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
                    : marketingImg;
                  return (
                    <div className={scss.block33}>
                      <Image
                        onClick={() => router.push(`/details/${el.id}`)}
                        src={imgUrl}
                        alt="marketingImg"
                        className={scss.img11}
                        width={0}
                        height={0}
                      />
                      <p>{el.title.slice(0, 20)}</p>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
