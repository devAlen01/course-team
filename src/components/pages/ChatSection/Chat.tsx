import React from "react";
import scss from "./Chat.module.scss";

const Chat = () => {
  return (
    <div className={scss.chat}>
      <div className="container">
        <div className={scss.content}>
          <h1>Chat</h1>
        </div>
      </div>
    </div>
  );
};

export default Chat;
