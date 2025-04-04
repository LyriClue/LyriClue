import { PROXY_URL } from "./spotifyApiConfig.js";

function getResponseACB(response) {
  if (!response.ok) throw new Error("HTTP status code: " + response.status);
  return response.json();
}

// Reference : https://developer.spotify.com/documentation/web-api/reference/get-a-list-of-current-users-playlists
export function getPlaylistPage(pageParams, model, provided_url = null) {
  if (provided_url) {
    var url: string = provided_url
  } else {
    var url: string = PROXY_URL +
      "me/playlists" +
      "?" +
      new URLSearchParams(pageParams)
  }
  return fetch(
    url,
    {
      headers: {
        "Authorization": "Bearer " + model.token,
      },
    },
  )
    .then(getResponseACB)
}

// Reference: https://developer.spotify.com/documentation/web-api/reference/get-playlists-tracks
export function getSongPage(songParams, model, provided_url = null) {
  if (provided_url) {
    var url: string = provided_url
  } else {
    var url: string = PROXY_URL + "playlists/" + songParams.playlistId + "/tracks"
    "?" + new URLSearchParams({ "market": songParams.market, "limit": songParams.limit, "offset": songParams.offset }) //TODO: maybe att fields param?
  }
  return fetch(
    url,
    {
      headers: {
        "Authorization": "Bearer " + model.token,
      },
    },
  )
    .then(getResponseACB)
}

export function getSongs(songParams: Object, model: any, provided_url = null) {
  return getSongPage(songParams, model, provided_url).then(filterValidSongsACB)
}

function pageToItemArrayACB(page: any) {
  return page.items
}

function filterValidSongsACB(page) {
  page.items = page.items.filter(isValidSongCB)
  return page
}

function isValidSongCB(song) {
  if (song.is_local) {
    return false
  }
  return true
}
