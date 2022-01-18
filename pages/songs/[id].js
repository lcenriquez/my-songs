import { getSong } from '../../data/library';

export default function Home({ song }) {
  console.log(song);

  return (
    <div>
      <h1>My songs</h1>
      <h1>{song.title}</h1>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.query
  let song;
  try {
    song = await getSong(id);
  } catch (e) {
    return { notFound: true }; // If something goes wrong, we return a 404 page
  }
  if (!song) return { notFound: true }; // If we don't get back an object, we return a 404 page
  return { props: { song } };
}