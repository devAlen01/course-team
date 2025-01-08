"use client";

import React, { FC } from "react";
import scss from "./RegisterForm.module.scss";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { BiLogoFacebookCircle } from "react-icons/bi";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import apiClient from "@/services/api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const FormSchema = z.object({
  name: z.string().min(1, "Имя обязательно").max(100, "Имя слишком длинное"),
  email: z.string().min(1, "Почта обязательна").email("Некорректный email"),
  password: z
    .string()
    .min(1, "Пароль обязателен")
    .min(8, "Пароль должен содержать не менее 8 символов"),
});

const RegisterForm: FC = (props) => {
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
    try {
      const newUser = {
        username: values.name,
        email: values.email,
        password: values.password,
      };
      await apiClient.post("/auth/register", newUser);
      router.push("/login");
    } catch (error: any) {
      if (error.response?.status === 409) {
        toast.error('🦄 "Пользователь с таким email уже зарегистрирован."', {
          position: "top-center",

          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
      setTimeout(() => {
        toast.error("Не удалось выполнить регистрацию", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }, 4000);
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
              {/* 1 */}
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
              {/* 2 */}
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
              {/* 3 */}
              <div className={scss.textField}>
                <label htmlFor="pass">Пароль*</label>
                <input
                  type="password"
                  placeholder="Введите свой пароль"
                  {...form.register("password")}
                />
                <p className={scss.error}>
                  {form.formState.errors.password?.message}
                </p>
              </div>
              {/* 4 */}
              <div className={scss.check}>
                <input type="checkbox" required />
                <span>Согласен с Условиями</span>
              </div>
              <button className={scss.submit} type="submit">
                Регистрация
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
