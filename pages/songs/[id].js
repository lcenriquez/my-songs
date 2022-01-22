import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { addFavoriteSong } from "../../app/reducer";

export default function Song({ songId }) {
  const dispatch = useDispatch();
  const [ song, setSong ] = useState({});

  useEffect(() => {
    fetch(`/api/songs/${songId}`)
    .then(res => res.json())
    .then(data => setSong(data));
  },[])

  function addToFavorites() {
    const { id, full_title, artist_names } = song
    dispatch(addFavoriteSong({id, title: full_title, artist: artist_names}));
  }

  return (
    <div className='container'>
      <span>
        <h1>{song?.title}</h1>
        <span onClick={addToFavorites}>Add to favorites</span>
      </span>
      
      <h2>{song?.primary_artist?.name}</h2>
      <p>Producers: {song?.producer_artists?.map((p,i) => i<song.producer_artists.length-1 ? `${p.name}, ` : `${p.name}`)}</p>
      <p>Album: {song?.album?.name}</p>
      <p>Lyrics</p>
      <pre>{song?.lyrics}</pre>
    </div>
  );
};

Song.getInitialProps = async (context) =>{
  const { id } = context.query
  return { songId: id }
}