const BASE_URL = process.env.BASE_URL;
const LYRICS_URL = process.env.LYRICS_URL;
const AUTH_TOKEN = process.env.SECRET_TOKEN;
const cheerio = require('cheerio');

export async function getSong(id) {
  let song;
  try {
    song = await fetch(`${BASE_URL}/songs/${id}`, {
      method: 'get',
      headers: new Headers({
        'Authorization': 'Bearer ' + AUTH_TOKEN,
        'Accept': 'application/json'
      })
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Something went wrong with the request");
      }
      return response.json();
    })
    .then((json) => json.response.song);
  } catch (e) {
    console.log("...logging error to our system...");
    throw e;
  }
  return song;
};

export async function getSongLyrics(path) {
  let song;
  try {
    song = await fetch(`${LYRICS_URL}${path}`, {
      method: 'get',
      headers: new Headers({
        'Authorization': 'Bearer ' + AUTH_TOKEN,
        'Accept': 'application/json'
      })
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Something went wrong with the request");
      }
      return response.text();
    });
  } catch (e) {
    console.log("...logging error to our system...");
    throw e;
  }
  const $ = cheerio.load(song);

  const selectors  = [
    () => $(".lyrics").text().trim(),
    () => $("div[class*='Lyrics__Container']")
    .toArray()
    .map((x) => {
      const ele = $(x);
      ele.find("br").replaceWith("\n");
      return ele.text().trim();
    })
    .join("\n\n")
    .trim(),
  ];

  for (const x of selectors) {
    const lyrics = x();
    if (lyrics?.length) {
      return removeChorus(lyrics);
    }
  }
};

export default async function songs(req, res) {
  let id = req.query.id;
  let song = await getSong(id);
  let lyrics = await getSongLyrics(song.path);
  res.status(200).json({...song, lyrics});
};

function removeChorus(lyrics) {
  return lyrics.replace(/^\[[^\]]+\]$/g, "");
};