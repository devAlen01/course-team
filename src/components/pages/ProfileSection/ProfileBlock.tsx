"use client";
import React, { FC, useState } from "react";
import scss from "./ProfileBlock.module.scss";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  useGetMeQuery,
  useUpdateProfileMutation,
  useUpdateProfileRoleMutation,
} from "@/redux/api/auth";
import { useCourseAdminQuery, useCourseMyQuery } from "@/redux/api/course";
import CourseAdmin from "./CourseAdmin";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import CourseStudent from "./CourseStudent";

const ProfileSchema = z.object({
  name: z.string().min(2, "Имя пользователя должно быть не менее 2 символов"),
  avatarUrl: z.string().url("Введите корректный URL аватара"),
  role: z.enum(["ADMIN", "STUDENT"]).optional(),
});

type ProfileFormData = z.infer<typeof ProfileSchema>;

const ProfileBlock: FC = () => {
  const { data } = useGetMeQuery();
  const [updateProfileMutation] = useUpdateProfileMutation();
  const [updateProfileRoleMutation] = useUpdateProfileRoleMutation();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [activeButton1, setActiveButton1] = useState<string>("Мои курсы");
  const favorite = useSelector((s: RootState) => s.favorite.favorite);
  const { data: courseMy } = useCourseMyQuery();
  const filteredCoursesMy = activeButton1 === "Мои курсы" ? courseMy : favorite;
  const handleButtonClick1 = (buttonName1: string) => {
    setActiveButton1(buttonName1);
  };
  const { data: courseAdmin, isLoading: loading } = useCourseAdminQuery();
  const [activeButton, setActiveButton] = useState<string>("Все курсы");

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  const filteredCourses = courseAdmin?.filter((course) => {
    const price = Number(course.price);
    if (activeButton === "Платные") {
      return price > 0;
    }
    if (activeButton === "Бесплатные") {
      return price === 0;
    }
    return true;
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: data?.user?.name || "",
      avatarUrl: data?.user?.avatarUrl || "",
      role: data?.user?.role ?? "STUDENT",
    },
  });

  const onSubmit = async (formData: ProfileFormData) => {
    setIsLoading(true);
    setResponseMessage(null);
    try {
      await updateProfileMutation({
        avatarUrl: formData.avatarUrl,
        name: formData.name,
      }).unwrap();
      await updateProfileRoleMutation({
        role: formData.role || "STUDENT",
      });
      setResponseMessage("Профиль успешно обновлён");
      setIsEdit(false);
      router.refresh();
    } catch (error: any) {
      setResponseMessage(error?.data?.message || "Ошибка обновления профиля");
    } finally {
      setIsLoading(false);
    }
  };

  if (isEdit) {
    return (
      <form
        className={scss.UpdateProfileForm}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={scss.textField}>
          <input
            id="username"
            type="text"
            {...register("name")}
            className="inputField"
            placeholder={data?.user.name + " - Введите имя"}
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

        <div className={scss.textField}>
          <input
            id="avatar"
            type="text"
            {...register("avatarUrl")}
            className="inputField"
            placeholder="Profile avatar URL"
            defaultValue={data?.user.avatarUrl!}
          />
          {errors.avatarUrl && (
            <p className="error">{errors.avatarUrl.message}</p>
          )}
        </div>
        <div className={scss.textField}>
          <select {...register("role")} className="inputField">
            <option value="ADMIN">ADMIN</option>
            <option value="STUDENT">STUDENT</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={scss.submitButton}
        >
          {isLoading ? "Загрузка..." : "Сохранить"}
        </button>

        {responseMessage && (
          <p
            className={`${scss.responseMessage} ${
              responseMessage.includes("успешно") ? scss.success : scss.error
            }`}
          >
            {responseMessage}
          </p>
        )}
        <div
          style={{
            cursor: "pointer",
            margin: "20px",
            fontSize: "20px",
          }}
          onClick={() => setIsEdit(!isEdit)}
        >
          <button style={{ background: "black" }}>Закрыть</button>
        </div>
      </form>
    );
  }

  return (
    <section className={scss.ProfileBlock}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.blockAll}>
            <div className={scss.banner}></div>
            <div className={scss.imgWrapper}>
              <img src={data?.user.avatarUrl! || "/defAva.png"} alt="avatart" />
            </div>

            <div className={scss.infoBlock}>
              <div className={scss.userInfo}>
                <div className={scss.username}>
                  <h4 className={scss.name}>{data?.user.name}</h4>
                  <span className={scss.role}>{data?.user.role}</span>
                </div>
                <div className={scss.action}>
                  <button onClick={() => setIsEdit(!isEdit)}>
                    Редактировать
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={scss.block1}>
            {data?.user.role === "ADMIN" ? (
              <div className={scss.blockBtn}>
                {["Все курсы", "Платные", "Бесплатные"].map((name) => (
                  <span
                    key={name}
                    className={`${scss.filterButton} ${
                      activeButton === name ? scss.active : ""
                    }`}
                    onClick={() => handleButtonClick(name)}
                  >
                    {name}
                  </span>
                ))}
                <button className={scss.btn1}>
                  <span onClick={() => router.push(`/create`)}>
                    Создавать курсы
                  </span>
                </button>
              </div>
            ) : (
              <div className={scss.blockBtn}>
                {["Мои курсы", "Избранные"].map((name1) => (
                  <span
                    key={name1}
                    className={`${scss.filterButton} ${
                      activeButton1 === name1 ? scss.active : ""
                    }`}
                    onClick={() => handleButtonClick1(name1)}
                  >
                    {name1}
                  </span>
                ))}
              </div>
            )}
            {data?.user.role === "ADMIN" &&
            filteredCourses &&
            filteredCourses.length > 0 ? (
              <div className={scss.block}>
                {filteredCourses.map((el) => (
                  <CourseAdmin
                    key={el.id}
                    title={el.title}
                    youtubeUrl={el.youtubeUrl}
                    description={el.description}
                    price={el.price}
                    id={el.id}
                  />
                ))}
              </div>
            ) : (
              <div className={scss.block}>
                {filteredCoursesMy?.map((el) => (
                  <CourseStudent
                    key={el.id}
                    title={el.title}
                    youtubeUrl={el.youtubeUrl}
                    description={el.description}
                    price={el.price}
                    id={el.id}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileBlock;
