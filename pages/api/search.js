const BASE_URL = process.env.BASE_URL;
const AUTH_TOKEN = process.env.SECRET_TOKEN;

export default async function search(req, res) {
  let query = req.query.q;
  let results;
  try {
    results = await fetch(`${BASE_URL}/search?q=${query}`, {
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
    .then((json) => json.response.hits);
  } catch (error) {
    throw error;
  }
  res.status(200).json(results);
};