"use client";
import { useState } from 'react';
import styles from './Chat.module.scss';

interface Chat {
  name: string;
  messages: string[];
}

export default function Chat() {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');
  const [chats, setChats] = useState<Chat[]>([
    { name: 'Друзья навеки', messages: ['Привет ребятв!'] },
    { name: 'Однокурссники', messages: ['Рад видеть вас'] },
    { name: 'Девчонки', messages: ['Какие планы на сегодня?'] },
    { name: 'Бека', messages: ['Где ты?'] },
    { name: 'Ира', messages: ['Хорошо'] },
    { name: 'Азамат', messages: ['Привет'] },
    { name: 'Бегимай', messages: ['Я приеду сегодня'] },
  ]);

  const handleChatClick = (chatName: string) => {
    setActiveChat(chatName);
  };

  const handleSendMessage = () => {
    if (message && activeChat) {
      setChats(prevChats =>
        prevChats.map(chat =>
          chat.name === activeChat
            ? { ...chat, messages: [...chat.messages, message] }
            : chat
        )
      );
      setMessage('');
    }
  };

  const activeChatData = chats.find((chat: Chat) => chat.name === activeChat);

  return (
    <div className={styles.chatContainer}>
      <div className={styles.sidebar}>
        {chats.map((chat: Chat) => (
          <div
            key={chat.name}
            className={styles.chatItem}
            onClick={() => handleChatClick(chat.name)}
          >
            <div className={styles.chatAvatar}></div>
            <div className={styles.chatInfo}>
              <div className={styles.chatName}>{chat.name}</div>
              <div className={styles.chatMessage}>{chat.messages[chat.messages.length - 1]}</div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.chatWindow}>
        {activeChat && (
          <>
            <div className={styles.chatHeader}>
              <div className={styles.chatAvatar}></div>
              <div className={styles.contactName}>{activeChat}</div>
            </div>
            <div className={styles.chatMessages}>
              {activeChatData?.messages.map((msg, index) => (
                <div
                  key={index}
                  className={`${styles.message} ${index % 2 === 0 ? styles.received : styles.sent}`}
                >
                  {msg}
                </div>
              ))}
            </div>
            <div className={styles.chatInput}>
              <input
                type="text"
                placeholder="Написать сообщение..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button onClick={handleSendMessage}>Отправить</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
