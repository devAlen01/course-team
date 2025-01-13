"use client";

import React, { FC, useState } from "react";
import scss from "./ProfileBlock.module.scss";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useGetMeQuery, useUpdateProfileMutation } from "@/redux/api/auth";

const ProfileSchema = z.object({
  name: z.string().min(2, "Имя пользователя должно быть не менее 2 символов"),
  avatarUrl: z.string().url("Введите корректный URL аватара"),
});

type ProfileFormData = z.infer<typeof ProfileSchema>;

const ProfileBlock: FC = (props) => {
  const { data } = useGetMeQuery();
  const [updateProfileMutation] = useUpdateProfileMutation();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: data?.user?.name || "",
      avatarUrl: data?.user?.avatarUrl || "",
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
      </div>
    </section>
  );
};

export default ProfileBlock;
