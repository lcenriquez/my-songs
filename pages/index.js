import { useState } from "react";
import MainSearchBar from "../components/MainSearchBar";
import SearchResults from "../components/SearchResults";
import style from '../styles/Home.module.css';

export default function Home() {
  const [ query, setQuery ] = useState('');
  const [ results, setResults ] = useState();

  async function handleSubmit(event) {
    event.preventDefault();
    setResults(await fetch(`/api/search/?q=${query}`).then(res => res.json()));
  }

  return (
    <div>
      <div className={style.banner}>
        <h1>Welcome to mySongs</h1>
        <h2>Search your favorite songs and add them to your playlist</h2>
        <div className={style.search}>
          <MainSearchBar handleSubmit={handleSubmit} setQuery={setQuery} />
          { results ? <SearchResults results={results} /> : null }
        </div>
      </div>
      <div className="container">
        <h1>Finding lyrics has never been easier</h1>
        <h3>Lookup any song you want</h3>
        <p>This is the right place for music lovers</p>
      </div>
    </div>
  );
};