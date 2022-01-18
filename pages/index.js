import { useState } from "react";
import SearchResults from "../components/SearchResults";

export default function Home() {
  const [ query, setQuery ] = useState('');
  const [ results, setResults ] = useState();

  async function handleSubmit(event) {
    event.preventDefault();
    setResults(await fetch(`/api/search/?q=${query}`).then(res => res.json()));
  }

  return (
    <div>
      <h1>Welcome to mySongs</h1>
      <h2>Search your favorite songs and add them to your playlist</h2>
      <form>
        <input type="text" name="name" placeholder="Song name, artist, album, etc" onChange={(e) => setQuery(e.target.value)} />
        <button onClick={(e) => handleSubmit(e)}>Search</button>
      </form>
      { results ? <SearchResults results={results} /> : null }
    </div>
  );
};