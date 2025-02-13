"use client";

import React from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import scss from "./ContactInfo.module.scss";

const ContactInfo: React.FC = () => {
  return (
    <div className={scss.contactInfo}>
      <h2>Контактная информация</h2>

      <div className={scss.infoItem}>
        <MapPin size={24} />
        <div>
          <h3>Адрес</h3>
          <p>
            ул. Куренкеева, 138
            <br />
            Бишкек, 123456
          </p>
        </div>
      </div>

      <div className={scss.infoItem}>
        <Phone size={24} />
        <div>
          <h3>Телефон</h3>
          <p>+996 (999) 12-45-99</p>
        </div>
      </div>

      <div className={scss.infoItem}>
        <Mail size={24} />
        <div>
          <h3>Email</h3>
          <p>info@company.ru</p>
        </div>
      </div>

      <div className={scss.infoItem}>
        <Clock size={24} />
        <div>
          <h3>Режим работы</h3>
          <p>
            Пн-Пт: 9:00 - 18:00
            <br />
            Сб-Вс: Выходной
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
