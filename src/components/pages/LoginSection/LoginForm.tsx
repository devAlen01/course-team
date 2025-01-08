"use client";

import React, { FC } from "react";
import scss from "./LoginForm.module.scss";
import { FcGoogle } from "react-icons/fc";
import { BiLogoFacebookCircle } from "react-icons/bi";
import Link from "next/link";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const FormSchema = z.object({
  email: z.string().min(1, "Почта обязательна").email("Некорректный email"),
  password: z
    .string()
    .min(1, "Пароль обязателен")
    .min(8, "Пароль должен содержать не менее 8 символов"),
});

const LoginForm: FC = (props) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const signInData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    if (signInData?.error) {
      toast.error("Email или пароль введены неверно", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      router.push("/profile");
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
                  type="password"
                  placeholder="Пароль"
                  {...form.register("password")}
                />
                <p className={scss.error}>
                  {form.formState.errors.password?.message}
                </p>
              </div>
              <p>Забыли пароль?</p>
              <button className={scss.login} type="submit">
                Войти
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
