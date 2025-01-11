import styles from './Section3.module.scss';
import icon1 from '../../../../public/assets/asign1.png'
import icon2 from '../../../../public/assets/microphone.png'
import icon3 from '../../../../public/assets/support.png'
import Image from 'next/image';


const Section3 = () => {
    return (
        <section className={styles.section}>
            <div className={`container ${styles.container}`}>
                <div className={styles.left}>
                    <h2>Почему (название кур.)</h2>
                    <p>Мы предоставляем множество функций, которые вы можете использовать. Постепенное накопление информации.</p>
                    <div className={styles.stat}>
                        <h3>100+</h3>
                        <p>Мы предоставляем множество функций, которые вы можете использовать. Постепенное накопление информации.</p>
                    </div>
                    <div className={styles.stat}>
                        <h3>80+</h3>
                        <p>Мы предоставляем множество функций, которые вы можете использовать. Постепенное накопление информации.</p>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.feature}>
                        <Image src={icon1} alt='личное обучение' />
                        <div>
                            <h4>Личное обучение</h4>
                            <p>Постепенное накопление информации об атомном и мелкомасштабном поведении...</p>
                        </div>
                    </div>
                    <div className={styles.feature}>
                        <Image src={icon2} alt='интерактивное уроки' />
                        <div>
                            <h4>Интерактивные уроки</h4>
                            <p>Постепенное накопление информации об атомном и мелкомасштабном поведении...</p>
                        </div>
                    </div>
                    <div className={styles.feature}>
                        <Image src={icon3} alt='27/7 поддержка учеников' />
                        <div>
                            <h4>24/7 Поддержка учеников</h4>
                            <p>Постепенное накопление информации об атомном и мелкомасштабном поведении...</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Section3;
