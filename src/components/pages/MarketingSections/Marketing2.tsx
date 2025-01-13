import React from "react";
import scss from "./Marketing2.module.scss";
import marketingImg from "../../../assets/market.png";
import Image from "next/image";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import coursesImg1 from "../../../assets/Rectangle 29874.png";
import coursesImg2 from "../../../assets/Rectangle 29874.png";
import coursesImg3 from "../../../assets/Rectangle 29874.png";
import { AiFillCaretRight } from "react-icons/ai";
import { PiLockKeyLight } from "react-icons/pi";
const Marketing2 = () => {
  const images = [coursesImg1, coursesImg2, coursesImg3];
  return (
    <div className={scss.Marketing2}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.block1}>
            <p className={scss.p}>назад</p>
            <div className={scss.text}>
              <h1>Маркетинг</h1>
              <p>
                Мы предоставляем множество функций, которые вы можете
                использовать. Постепенное накопление информация{" "}
              </p>
            </div>
            <div></div>
          </div>
          <div className={scss.block2}>
            <div className={scss.blockImg}>
              <Image
                src={marketingImg}
                alt="marketingImg"
                className={scss.img}
              />
              <div className={scss.texts}>
                <h1>Как ставить о оценивать задачи</h1>
                <div className={scss.description}>
                  <p>
                    Прежде чем разбирать бизнес-кейсы, стоит поговорить об
                    основах финансовой грамотности. На вопрос, как сохранить
                    деньги, Маргулан Калиевич предлагает несколько стратегий:
                  </p>
                  <p>
                    <span> Фиксированный налог</span> на будущее и безопасность.
                    С каждого своего дохода откладывайте по 10% на будущее и на
                    безопасность. Прелесть этой стратегии в том, что она
                    подходит как длялюдей с доходом 500$, так и для людей с
                    доходом 500 000$.
                  </p>
                  <p>
                    <span>Прогрессивный налог</span> на будущее. Суть метода в
                    том, что вы откладываете не 10%, а столько, сколько вам лет.
                    Например, если вам 30, то и налог — 30%. Это могут позволить
                    уже не все, зато для обладателей больших доходов такой
                    подход более уместен, ведь он лучше страхует от рисков,
                    связанных с предпринимательской деятельностью.
                  </p>
                  <p>
                    <span>Регрессивный налог</span> на будущее. В данном случае
                    вы откладываете не такой процент, сколько вам лет, а
                    процент, равный вычитанию возраста из 100. То есть если вам
                    30, то откладывайте 70% дохода. Очевидно, этот способ
                    подойдёт только для тех, лишь малая доля дохода которых уже
                    обеспечивает комфорт. Зато это неплохой задел на раннюю
                    пенсию и безбедное детство детей.
                  </p>
                </div>
              </div>
            </div>
            <p className={scss.more}>Читать больше</p>
            <p className={scss.paragrav}>
              Хранить эти деньги стоит диверсифицированно. 10% сбережений
              оставляйте в национальной валюте вашей страны. 90 % распределите
              на 3 валюты: швейцарский франк, норвежская крона, и что-то из:
              американского доллара, евро либо йены. Рассмотрите варианты
              сбережений вгосударственных бумагах, фиксированных к инфляции.Эти
              рекомендации касаются личного бюджета. Ниже мы рассмотрим основные
              финансовые рискив бизнесе и стратегии управления ими.
            </p>
            <button>Купить курс</button>
          </div>
          <div className={scss.block3}>
            <div className={scss.blockText}>
              <hr />
              <div className={scss.text}>
                <p>Урок 1 : Ознакомление</p>
                <MdKeyboardArrowDown className={scss.icon} />
              </div>
            </div>
            <div className={scss.blockImgs}>
              {images.map((img, idx) => (
                <div className={scss.blockText1}>
                  <div className={scss.coursesImg}>
                    <Image src={img} alt="img" key={idx} className={scss.img} />
                    <div className={scss.coursesVideo}>
                      <AiFillCaretRight className={scss.icon1} />
                      <PiLockKeyLight className={scss.icon2} />
                    </div>
                    <div className={scss.coursesTime}>
                      <p>1 ч. 23м.</p>
                    </div>
                  </div>
                  <p>1. Ознакомление</p>
                  <h4>Как ставить о оценивать задачи</h4>
                </div>
              ))}
            </div>
            <div className={scss.blockCourses11}>
              <hr />
              <div className={scss.block12}>
                <p>Урок 2 : Методы бизнеса</p>
                <MdKeyboardArrowUp className={scss.icon} />
              </div>
              <hr />
              <div className={scss.block12}>
                <p>Урок 3 : Как начать зарабатывать больше</p>
                <MdKeyboardArrowUp className={scss.icon} />
              </div>{" "}
              <hr />
              <div className={scss.block12}>
                <p>Урок 4 : Заключение</p>
                <MdKeyboardArrowUp className={scss.icon} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketing2;
