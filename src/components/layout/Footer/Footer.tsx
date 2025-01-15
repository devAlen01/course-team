import React, { FC } from "react";
import scss from "./Footer.module.scss";

const Footer: FC = () => {
  return (
    <footer className={scss.Footer}>
      <div className={scss.content}>
        <div className={scss.blockSearch1}>
          <div className={scss.blockText}>
            <h1>Присоединяйся к нам</h1>
            <p>
              Мы предоставляем множество функций, которые вы можете
              использовать. Постепенное накопление информация
            </p>
          </div>
          <div className={scss.blockSearch}>
            <input type="text" placeholder="Твой Email" />
            <button>Подписка</button>
          </div>
        </div>
        <div className={scss.Block}>
          <div className={scss.block1}>
            <h1>Logo</h1>
            <div className={scss.description}>
              <p>
                (Название)— это частная виртуальная сеть <br /> с уникальными
                функциями и высоким <br /> уровнем безопасности.
              </p>
              <div className={scss.round}>
                <h1></h1>
                <h1></h1>
                <h1></h1>
              </div>
            </div>
            <span>©2020LaslesVPN</span>
          </div>
          <div className={scss.block2}>
            <div className={scss.block11}>
              <h1>Продукт</h1>
              <div className={scss.texts}>
                <p>Download</p>
                <p>Pricing</p>
                <p>Locations</p>
                <p>Server</p>
                <p>Countries</p>
                <p>Blog</p>
              </div>
            </div>
            <div className={scss.block22}>
              <h1>Engage</h1>
              <div className={scss.texts}>
                <p>LaslesVPN ?</p>
                <p>FAQ</p>
                <p>Tutorials</p>
                <p>About Us</p>
                <p>Privacy Policy</p>
                <p>Terms of Service</p>
              </div>
            </div>
            <div className={scss.block3}>
              <h1>Earn Money</h1>
              <div className={scss.texts}>
                <p>Affiliate</p>
                <p>Become Partner</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
