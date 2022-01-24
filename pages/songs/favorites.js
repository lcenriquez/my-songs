import Link from "next/link";
import { useSelector, useDispatch } from "react-redux"
import { removeFavoriteSong } from "../../redux/reducer";

export default function FavoriteSongs() {
  const dispatch = useDispatch();
  const favoriteSongs = useSelector(state => state.reducer.songList)

  function deleteSong(event, song) {
    event.preventDefault();
    dispatch(removeFavoriteSong(song.id));
  }

  let songListArray = favoriteSongs?.map(song => {
    return (
      <li key={song.id}>
        <Link href={`/songs/${song.id}`}><a>{song.title}</a></Link> |
        <button onClick={(e) => deleteSong(e, song)}>Delete</button>
      </li>
    );
  });

  return (
    <div className="container">
      <h1>Favorite song list</h1>
      <ol>
        {songListArray}
      </ol>
    </div>
  )
}