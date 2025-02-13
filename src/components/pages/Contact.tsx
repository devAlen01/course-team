import React from "react";

import styles from "./Contact.module.scss";
import ContactForm from "./ContactForm/ContactForm";
import ContactInfo from "./ContactInfo/ContactInfo";

const Contact: React.FC = () => {
  return (
    <div className={styles.contactPage}>
      <div className={styles.hero}>
        <h1>Свяжитесь с нами</h1>
        <p>Мы всегда рады помочь вам и ответить на все ваши вопросы</p>
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.formSection}>
            <ContactInfo />
          </div>

          <div className={styles.infoSection}>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
