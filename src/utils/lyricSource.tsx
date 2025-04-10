import { PROXY_URL } from "./lyricApiConfig.js";

function getResponseACB(response) {
  if (!response.ok) throw new Error("HTTP status code: " + response.status);
  return response.json();
}

function errorACB(error) {
  return null
}

// Reference : https://lyricsovh.docs.apiary.io/#reference/0/lyrics-of-a-song/search?console=1
export function getLyrics(songParams) {
  var url: string = PROXY_URL +
    "/" + songParams.artist +
    "/" + songParams.title
  // new URLSearchParams(pageParams)
  return fetch(
    url,
  )
    .then(getResponseACB).catch(errorACB)
}

