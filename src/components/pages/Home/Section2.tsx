import React from 'react';
import styles from './Section2.module.scss';

const Section2 = () => {
    return (
        <div className={styles.Section2}>
            <div className="container">
                <div className={styles.content}>
                    <div className={styles.card}>
                        <img src="/assets/card1.png" alt="Пожизненный доступ" className={styles.cardImage} />
                        <h3 className={styles.cardTitle}>Пожизненный доступ</h3>
                        <hr style={{ width: "50px", border: "1px solid rgb(231, 64, 64)", marginLeft: "10%" }} />
                        <p className={styles.cardDescription}>
                            Постепенное накопление информации об атомном и мелкомасштабном поведении...
                        </p>
                    </div>
                    <div className={styles.card}>
                        <img src="/assets/card2.png" alt="Сертифицированный преподаватель" className={styles.cardImage} />
                        <h3 className={styles.cardTitle}>Сертифицированный преподаватель</h3>
                        <hr style={{ width: "50px", border: "1px solid rgb(231, 64, 64)", marginLeft: "10%" }} />
                        <p className={styles.cardDescription}>
                            Постепенное накопление информации об атомном и мелкомасштабном поведении...
                        </p>
                    </div>
                    <div className={styles.card}>
                        <img src="/assets/card3.png" alt="Обучающие курсы" className={styles.cardImage} />
                        <h3 className={styles.cardTitle}>Обучающие курсы</h3>
                        <hr style={{ width: "50px", border: "1px solid rgb(231, 64, 64)", marginLeft: "10%" }} />
                        <p className={styles.cardDescription}>
                            Постепенное накопление информации об атомном и мелкомасштабном поведении...
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Section2;
