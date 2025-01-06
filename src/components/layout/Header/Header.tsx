import React, { FC } from "react";
import scss from "./Header.module.scss";

const Header: FC = () => {
  return (
    <header className={scss.Header}>
      <div className="container">
        <div className={scss.content}> Header</div>
      </div>
    </header>
  );
};

export default Header;
