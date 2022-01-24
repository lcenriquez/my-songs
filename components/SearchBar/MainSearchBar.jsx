import style from './MainSearchBar.module.css';

export default function MainSearchBar({ handleSubmit, setQuery }) {
  function handleChange(event) {
    setQuery(event.target.value)
    if(event.target.value.length > 4) {
      handleSubmit(event);
    }
  }

  return (
    <div id={style.cover}>
      <form className={style.mainForm} onSubmit={(e) => handleSubmit(e)}>
        <div className={style.tb}>
          <div className={style.td}>
            <input type="text" className={style.mainInput} placeholder="Search" placeholder="Song name, artist, album, etc" onChange={(e) => handleChange(e)} name="mainSearchInput" data-testid="mainSearchInput" />
          </div>
          <div className={style.td} id={style.s_cover}>
            <button className={style.mainButton} type="submit">
              <div id={style.s_circle}></div>
              <span></span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};