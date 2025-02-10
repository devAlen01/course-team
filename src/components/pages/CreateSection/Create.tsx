"use client";
import React from "react";
import scss from "./Create.module.scss";
import { useCourseCreateMutation } from "@/redux/api/course";
import { SubmitHandler, useForm } from "react-hook-form";

type CourseCreateRequest = {
  title: string;
  description: string;
  youtubeUrl: string;
  price: string;
  category: string;
};

const Create = () => {
  const { register, reset, handleSubmit } = useForm<CourseCreateRequest>();
  const [courseCreateMutation] = useCourseCreateMutation();

  const sentTodo: SubmitHandler<CourseCreateRequest> = async (data) => {
    try {
      const response = await courseCreateMutation(data).unwrap();
      console.log("Course created:", response);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={scss.Create}>
      <div className="container">
        <div className={scss.content}>
          <form onSubmit={handleSubmit(sentTodo)}>
            <select {...register("category", { required: true })}>
              <option value="">Категория</option>
              <option value="Управление компанией">Управление компанией</option>
              <option value="Командообразование">Командообразование</option>
              <option value="Маркетинг">Маркетинг</option>
              <option value="Продажи">Продажи</option>
              <option value="IT">IT</option>
            </select>
            <input
              {...register("youtubeUrl", { required: true })}
              type="text"
              placeholder="URL"
            />
            <input
              {...register("title", { required: true })}
              type="text"
              placeholder="Title"
            />
            <input
              {...register("price", { required: true })}
              type="number"
              placeholder="Price"
            />
            <textarea
              id="message"
              placeholder="Description"
              className={scss.inputField}
              {...register("description", { required: true })}
            ></textarea>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
