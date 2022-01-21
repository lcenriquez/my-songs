import { useEffect, useState } from 'react';

export default function Song({ songId }) {
  const [ song, setSong ] = useState({});
  if (song) console.log(song);

  useEffect(() => {
    fetch(`/api/songs/${songId}`)
    .then(res => res.json())
    .then(data => setSong(data));
  },[])

  return (
    <div className='container'>
      <h1>{song?.title}</h1>
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