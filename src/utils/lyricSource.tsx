import { PROXY_URL } from "./lyricApiConfig.js";

function getResponseACB(response: Response) {
  if (!response.ok) throw new Error("HTTP status code: " + response.status);
  return response.json();
}

function errorACB(e) {
  console.log(e);

  return null
}

// Reference : https://lyricsovh.docs.apiary.io/#reference/0/lyrics-of-a-song/search?console=1
export function getLyrics(songParams: { artist?: any; title?: any; }) {
  var url: string = PROXY_URL +
    "/" + songParams.artist +
    "/" + songParams.title
  // new URLSearchParams(pageParams)
  return fetch(
    url,
  ).then(getResponseACB).then(removeOddities).then(splitLyrics).catch(errorACB)

  function splitLyrics(res: { lyrics: string }) {
    return res.lyrics.split(/\n|\r/).filter((line: string) => line != "")
  }
  function removeOddities(res: { lyrics: string }) {
    res.lyrics = res.lyrics.replace(/\[.*\]/, "")
    res.lyrics = res.lyrics.replace(/\(feat.*\)/, "")
    res.lyrics = res.lyrics.replace(/\(.*\)/, "")
    res.lyrics = res.lyrics.replace(/chorus/, "")
    return res
  }
}

