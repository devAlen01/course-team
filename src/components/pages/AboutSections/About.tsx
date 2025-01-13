import React, { FC } from "react";
import scss from "./About.module.scss";
import aboutImg from "../../../assets/img.png";
import Image from "next/image";
import planImg1 from "../../../assets/Rectangle 29875.png";
import planImg2 from "../../../assets/Rectangle 29876.png";
import planImg3 from "../../../assets/Rectangle 29877.png";
import planImg4 from "../../../assets/Rectangle 29878.png";
import user from "../../../assets/image 1708.png";
const About = () => {
  return (
    <div className={scss.About}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.block1}>
            <p>
              Мы являемся топливом для вашего бизнеса, готовы дать вам
              образование и поднять ваш бренд до небес.
            </p>

            <div className={scss.block}>
              <Image src={aboutImg} alt="aboutImg" className={scss.img} />
            </div>
          </div>
          <div className={scss.blockImg}>
            <div className={scss.imgWrapper}>
              <Image src={planImg1} alt="imf" className={scss.img} />
              <Image
                src={planImg2}
                alt="imf"
                className={`${scss.img} ${scss.imgOverlay}`}
              />
            </div>
            <div className={scss.imgWrapper1}>
              <Image src={planImg3} alt="imf" className={scss.img} />
              <Image
                src={planImg4}
                alt="imf"
                className={`${scss.img} ${scss.imgOverlay}`}
              />
            </div>
          </div>
          <div className={scss.founder}>
            <h1>Наш основатель</h1>
            <div className={scss.story}>
              <div className={scss.textImg}>
                <Image src={user} alt="user" className={scss.img} />
                <p>
                  Большая история — новое исследовательское направление, в
                  рамках которого изучается единый преемственный процесс
                  развития Вселенной — с момента Большого взрыва до настоящего
                  времени. Междисциплинарный проект The Big History Project был
                  основан Биллом Гейтсом и Дэвидом Кристианом с целью разработки
                  целостного курса истории космоса, Земли, жизни и человечества
                  и преподавания его во всем мире.Эта книга, написанная на стыке
                  естественных и гуманитарных наук — физики, геологии,
                  астрономии, истории, .социологии и других, — насыщенное
                  обобщение социологии и других, — насыщенное обобщение новейших
                  научных представлений
                </p>
              </div>
              <p className={scss.more}>Читать больше</p>
              <span>
                социологии и других, — насыщенное обобщение новейших научных
                представлений <br /> Большая история — новое исследовательское
                направление, в рамках которого изучается единый преемственный
                процесс развития Вселенной — с момента Большого взрыва до
                настоящего времени. Междисциплинарный проект The Big History
                Project был основан Биллом Гейтсом и Дэвидом Кристианом с целью
                разработки целостного курса истории космоса, Земли, жизни и
                человечества и преподавания его во всем мире.Эта книга,
                написанная на стыке естественных и гуманитарных наук — физики,
                геологии, астрономии, истории, .
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
