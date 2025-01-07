import scss from "./Search.module.scss";

const Search = () => {
  return (
    <div className={scss.Search}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.blockText}>
            <h1>Присоединяйся к нам</h1>
            <p>
              Мы предоставляем множество функций, которые вы можете <br />
              использовать. Постепенное накопление информация{" "}
            </p>
          </div>
          <div className={scss.blockSearch}>
            <input type="text" placeholder="Твой Email" />
            <button>Подписка</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Search;
