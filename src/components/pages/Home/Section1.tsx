import React from "react";
import styles from "./Section1.module.scss";

const Section1 = () => {
  return (
    <div className={styles.Section1}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.left}>
            <h1>
              Надо много учиться, <br /> чтобы знать хоть немного.
            </h1>
            <span>
              Обеспечьте сеть для всех ваших потребностей легко и весело,
              используя наши курсы.Откройте для себя интересные функции от нас.
            </span>
            <button className={styles.btn}>Начать</button>
          </div>
          <div className={styles.right}></div>
        </div>
      </div>
    </div>
  );
};

export default Section1;
