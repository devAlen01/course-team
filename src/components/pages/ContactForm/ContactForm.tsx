"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";
import scss from "./ContactForm.module.scss";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form className={scss.form} onSubmit={handleSubmit}>
      <h2>Отправить сообщение</h2>

      <div className={scss.formGroup}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Ваше имя"
          required
        />
      </div>

      <div className={scss.formGroup}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
      </div>

      <div className={scss.formGroup}>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Тема"
          required
        />
      </div>

      <div className={scss.formGroup}>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Ваше сообщение"
          required
          rows={5}
        />
      </div>

      <button type="submit" className={scss.submitButton}>
        <Send size={20} />
        <span>Отправить</span>
      </button>
    </form>
  );
};

export default ContactForm;
