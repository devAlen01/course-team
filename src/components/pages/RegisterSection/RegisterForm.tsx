"use client";

import React, { FC, useState } from "react";
import scss from "./RegisterForm.module.scss";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { BiLogoFacebookCircle } from "react-icons/bi";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useRegisterMutation } from "@/redux/api/auth";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
const FormSchema = z.object({
  name: z
    .string()
    .min(1, "Имя обязательно")
    .max(100, "Имя слишком длинное")
    .regex(
      /^[a-zA-Z ]+$/,
      "Имя должно содержать только латинские буквы и пробелы"
    ),
  email: z.string().min(1, "Почта обязательна").email("Некорректный email"),
  password: z
    .string()
    .min(1, "Пароль обязателен")
    .min(8, "Пароль должен содержать не менее 8 символов")
    .regex(
      /^[a-zA-Z0-9]+$/,
      "Пароль должен содержать только латинские буквы и цифры"
    ),
});

const RegisterForm: FC = (props) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [registerMutation] = useRegisterMutation();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setIsLoading(true);
    try {
      const newUser = {
        name: values.name,
        email: values.email,
        password: values.password,
      };
      const res = await registerMutation(newUser);
      if (res.error) {
        form.setError("email", {
          message: "Пользователь с таким email уже зарегистрирован.",
        });
        setIsLoading(false);
      } else {
        router.push("/login");
        setIsLoading(false);
      }
    } catch (error: any) {
      form.setError("email", { message: "Произошла ошибка регистрации." });
      setIsLoading(false);
    }
  };

  return (
    <section className={scss.RegisterForm}>
      <div className={scss.header}>
        <div className="container">
          <div className={scss.link}>
            <Link href={"/login"}>Войти</Link>
          </div>
        </div>
      </div>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.formGroup}>
            <h3>Регистрация</h3>
            <form className={scss.form} onSubmit={form.handleSubmit(onSubmit)}>
              {/* Name */}
              <div className={scss.textField}>
                <label htmlFor="name">Имя</label>
                <input
                  type="text"
                  placeholder="Введите свое имя"
                  {...form.register("name")}
                />
                <p className={scss.error}>
                  {form.formState.errors.name?.message}
                </p>
              </div>
              {/* Email */}
              <div className={scss.textField}>
                <label htmlFor="email">Почта</label>
                <input
                  type="email"
                  placeholder="Введите свою почту"
                  {...form.register("email")}
                />
                <p className={scss.error}>
                  {form.formState.errors.email?.message}
                </p>
              </div>
              {/* Password */}
              <div className={scss.textField}>
                <label htmlFor="pass">Пароль*</label>
                <input
                  type={visible ? "text" : "password"}
                  placeholder="Введите свой пароль"
                  {...form.register("password")}
                />

                <span onClick={() => setVisible(!visible)} className={scss.eye}>
                  {visible ? <GoEye /> : <GoEyeClosed />}
                </span>

                <p className={scss.error}>
                  {form.formState.errors.password?.message}
                </p>
              </div>
              {/* Agreement Checkbox */}
              <div className={scss.check}>
                <input type="checkbox" required />
                <span>Согласен с Условиями</span>
              </div>
              <button
                style={{ background: isLoading ? "black" : "" }}
                className={scss.submit}
                type="submit"
              >
                {isLoading ? "Загрузка..." : "Регистрация"}
              </button>
            </form>
            <div className={scss.google_facebook}>
              <div className={scss.or}>
                <div className={scss.line}></div>
                <p>Или</p>
                <div className={scss.line}></div>
              </div>
              <div className={scss.action}>
                <button>
                  <span className={scss.icon}>
                    <FcGoogle />
                  </span>
                  Google
                </button>
                <button>
                  <span className={scss.icon}>
                    <BiLogoFacebookCircle />
                  </span>
                  Facebook
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;
