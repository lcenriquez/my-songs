const BASE_URL = process.env.BASE_URL;
const AUTH_TOKEN = process.env.SECRET_TOKEN;

export async function getSong(id) {
  let song;
  try {
    song = await fetch(`${BASE_URL}/songs/${id}`, {
      method: 'get',
      headers: new Headers({
        'Authorization': 'Bearer ' + AUTH_TOKEN,
        'Accept': 'application/json'
      })
    }
    ).then((response) => {
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