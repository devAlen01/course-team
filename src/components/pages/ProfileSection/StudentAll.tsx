import React, { FC } from "react";
import scss from "./StudentAll.module.scss";

interface IStudentAll {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: "ADMIN" | "USER";
}
const StudentAll: FC<IStudentAll> = ({ id, name, email, avatarUrl, role }) => {
  return (
    <div key={id} className={scss.StudentAll}>
      <div className={scss.block}>
        <img src={avatarUrl} alt="img" />
        <div className={scss.blockText}>
          <h1>{name}</h1>
          <p>{role}</p>
        </div>
      </div>
      <button className={scss.studentBtn}>Смотреть</button>
    </div>
  );
};

export default StudentAll;
