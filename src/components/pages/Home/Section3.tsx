import scss from "./Section3.module.scss";
import vector from "../../../assets/Vector.png";
import group from "../../../assets/Group.png";
import vector1 from "../../../assets/Vector (1).png";
const Section3 = () => {
  return (
    <div className={scss.Section3}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.block1}>
            <div className={scss.text1}>
              <h1>Почему (название кур.)</h1>
              <p>
                Мы предоставляем множество функций, которые вы можете
                использовать. Постепенное накопление информация{" "}
              </p>
            </div>
            <div className={scss.text2}>
              <h1>100+</h1>
              <p>
                Мы предоставляем множество функций, которые вы можете
                использовать. Постепенное накопление информация{" "}
              </p>
            </div>
            <div className={scss.text2}>
              <h1>80+</h1>
              <p>
                Мы предоставляем множество функций, которые вы можете
                использовать. Постепенное накопление информация{" "}
              </p>
            </div>
          </div>
          <div className={scss.block2}>
            <div className={scss.blockText1}>
              <img src={vector.src} alt="" />
              <div className={scss.text}>
                <h5>Личное обучение</h5>
                <p>
                  Постепенное накопление информация об атомном и мелкомасштабное
                  поведение...
                </p>
              </div>
            </div>
            <div className={scss.blockText1}>
              <img src={group.src} alt="" />
              <div className={scss.text}>
                <h5>Интерактивные уроки</h5>
                <p>
                  Постепенное накопление информация об атомном и мелкомасштабное
                  поведение...
                </p>
              </div>
            </div>
            <div className={scss.blockText1}>
              <img src={vector1.src} alt="" />
              <div className={scss.text}>
                <h5>24/7 Поддержка учеников</h5>
                <p>
                  Постепенное накопление информация об атомном и мелкомасштабное
                  поведение...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section3;
