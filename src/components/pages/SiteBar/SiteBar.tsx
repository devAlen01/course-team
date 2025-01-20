import React, { FC, useState } from "react";
import scss from "./SiteBar.module.scss";
import { HiUser } from "react-icons/hi2";
import Link from "next/link";
import { IoChatbubbleEllipsesSharp, IoSettingsSharp } from "react-icons/io5";
import { BiSolidShoppingBagAlt } from "react-icons/bi";
import { FaArrowRightFromBracket, FaStar } from "react-icons/fa6";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { CiStar } from "react-icons/ci";
import { MdClose } from "react-icons/md";

const SiteBar: FC = () => {
  const router = useRouter();
  const [rateWindow, setRateWindow] = useState(false);
  return (
    <div className={scss.SiteBar}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.blockAll}>
            <div className={scss.block1}>
              <Link href="/profile" className={scss.texts}>
                <HiUser className={scss.icon} />
                <span>Профиль</span>
              </Link>
              <Link href="/chat" className={scss.texts}>
                <IoChatbubbleEllipsesSharp className={scss.icon} />
                <span>Чат</span>
              </Link>{" "}
              <Link href="/courseAll" className={scss.texts}>
                <BiSolidShoppingBagAlt className={scss.icon} />
                <span>Курсы</span>
              </Link>{" "}
              <div onClick={() => setRateWindow(true)} className={scss.texts}>
                <FaStar className={scss.icon} />
                <span>Оценить</span>
              </div>{" "}
              <Link href="" className={scss.texts}>
                <IoSettingsSharp className={scss.icon} />
                <span>Настройки</span>
              </Link>
            </div>
            <div className={scss.block1}>
              <Link href="" className={scss.texts}>
                <BsFillQuestionCircleFill className={scss.icon} />
                <span>Помощь</span>
              </Link>
              <Link href="" className={scss.texts}>
                <FaArrowRightFromBracket className={scss.icon} />
                <span>Выйти</span>
              </Link>
            </div>
          </div>
          {rateWindow ? (
            <div className={scss.blockRate}>
              <MdClose
                onClick={() => setRateWindow(false)}
                className={scss.icon}
              />
              <h1>Как вам наш курс?</h1>
              <div className={scss.stars}>
                <CiStar className={scss.star} />
                <CiStar className={scss.star} />
                <CiStar className={scss.star} />
                <CiStar className={scss.star} />
                <CiStar className={scss.star} />
              </div>
              <div className={scss.input}>
                <input type="text" placeholder="Комментарий......" />
              </div>
              <button>Отправить</button>
            </div>
          ) : null}
          <hr />
        </div>
      </div>
    </div>
  );
};

export default SiteBar;
