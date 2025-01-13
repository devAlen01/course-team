"use client";

import React, { FC, useState } from "react";
import scss from "./LoginForm.module.scss";
import { FcGoogle } from "react-icons/fc";
import { BiLogoFacebookCircle } from "react-icons/bi";
import Link from "next/link";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useLogInMutation } from "@/redux/api/auth";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
const FormSchema = z.object({
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

const LoginForm: FC = (props) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [logInMutation] = useLogInMutation();

  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setIsLoading(true);
    const user: AUTH.PostSignInRequest = {
      email: values.email,
      password: values.password,
    };
    const { data, error } = await logInMutation(user);
    if (!data?.token || error) {
      form.setError("email", {
        message: "Пользователь с таким email не зарегистрирован.",
      });
      setIsLoading(false);
    } else {
      localStorage.setItem("token", JSON.stringify(data.token));
      router.push("/profile");
      setIsLoading(false);
    }
  };

  return (
    <section className={scss.LoginForm}>
      <div className={scss.container}>
        <div className={scss.banner}>
          <img src="/login-img.png" alt="banner" />
        </div>
        <div className={scss.content}>
          <div className={scss.formGroup}>
            <h2>Добро пожаловать</h2>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className={scss.textField}>
                <input
                  type="email"
                  placeholder="Почта"
                  {...form.register("email")}
                />
                <p className={scss.error}>
                  {form.formState.errors.email?.message}
                </p>
              </div>
              <div className={scss.textField}>
                <input
                  type={visible ? "text" : "password"}
                  placeholder="Пароль"
                  {...form.register("password")}
                />

                <span onClick={() => setVisible(!visible)} className={scss.eye}>
                  {visible ? <GoEye /> : <GoEyeClosed />}
                </span>
                <p className={scss.error}>
                  {form.formState.errors.password?.message}
                </p>
              </div>
              <p>Забыли пароль?</p>
              <button
                style={{ background: isLoading ? "black" : "" }}
                className={scss.login}
                type="submit"
              >
                {isLoading ? "Загрузка..." : "Войти"}
              </button>
            </form>
            <div className={scss.google_facebook}>
              <div className={scss.register}>
                У вас нет аккаунта?
                <Link href={"/register"}> Зарегистрироваться</Link>
              </div>
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

export default LoginForm;
