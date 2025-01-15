import React from 'react';
import Image from 'next/image';
import styles from './Section4.module.scss';
import product1 from '../../../../public/assets/product1.jpeg';
import product2 from '../../../../public/assets/product2.jpeg';
import product3 from '../../../../public/assets/product3.jpeg';

const Section4 = () => {
    return (
        <div className={styles.Section4}>
            <div className="container">
                <h1 className={styles.title}>Доступные курсы</h1>
                <p className={styles.description}>
                    Мы предоставляем множество функций, которые вы можете <br /> использовать. Постепенное накопление информации.
                </p>
                <div className={styles.cards}>
                    <div className={styles.card}>
                        <Image src={product1} alt="Курс 1" className={styles.cardImage} />
                        <div className={styles.cardContent}>
                            <h3 className={styles.cardTitle}>Как ставить задачи</h3>
                            <p className={styles.cardText}>
                                Мы ориентируемся на эргономику и эффективность. Это всего лишь нажатие клавиши.
                            </p>
                            <button className={styles.cardButton}>Узнать больше</button>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <Image src={product2} alt="Курс 2" className={styles.cardImage} />
                        <div className={styles.cardContent}>
                            <h3 className={styles.cardTitle}>Эффективное планирование</h3>
                            <p className={styles.cardText}>
                                Простые методы, которые помогут вам достичь ваших целей быстрее и проще.
                            </p>
                            <button className={styles.cardButton}>Узнать больше</button>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <Image src={product3} alt="Курс 3" className={styles.cardImage} />
                        <div className={styles.cardContent}>
                            <h3 className={styles.cardTitle}>Работа в команде</h3>
                            <p className={styles.cardText}>
                                Узнайте, как эффективно взаимодействовать с коллегами и улучшить продуктивность.
                            </p>
                            <button className={styles.cardButton}>Узнать больше</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Section4;
