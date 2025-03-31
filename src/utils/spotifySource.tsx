import { PROXY_URL } from "./spotifyApiConfig.js";

function getResponseACB(response) {
  if (!response.ok) throw new Error("HTTP status code: " + response.status);
  return response.json();
}

// Reference : https://developer.spotify.com/documentation/web-api/reference/get-a-list-of-current-users-playlists
export function getPlaylistPage(pageParams, model) {
  return fetch(
    PROXY_URL +
    "me/playlists" +
    "?" +
    new URLSearchParams(pageParams),
    {
      headers: {
        "Bearer": model.access_token,
      },
    },
  )
    .then(getResponseACB)
}

// Reference: https://developer.spotify.com/documentation/web-api/reference/get-playlists-tracks
export function getSongPage(songParams, model) {
  return fetch(
    PROXY_URL +
    "playlists/" + songParams.playlistId + "/tracks/" +
    "?" + new URLSearchParams({ "limit": songParams.limit, "offset": songParams.offset }), //TODO: maybe att fields param?
    {
      headers: {
        "Bearer": model.access_token,
      },
    },
  )
    .then(getResponseACB)
}

export function getSongs(songParams: Object, model: any) {
  return getSongPage(songParams, model).then(pageToItemArrayACB)

}

function pageToItemArrayACB(page: any) {
  return page.items
}
