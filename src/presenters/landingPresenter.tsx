// import { redirect, useNavigate } from "react-router-dom";
import { LandingView } from "../views/landingView";
// import { Link } from "react-router-dom"


export function LandingPresenter(props: any) {
  console.log("landingview");
  return (
    <LandingView playOwnPlaylist={PlayOwnPlaylistsACB} 
                playDailyPlaylist={playDailyPlaylistACB}
    />
  );
  function playDailyPlaylistACB() {
    console.log("play own playlists");
    if (!props.model.playlists) {
      props.model.retrievePlaylists()
    }

    props.model.setCurrentPlaylist(props.model.playlists.items[9])
    props.model.startGame()
  }
  function PlayOwnPlaylistsACB() {
    if (!props.model.playlists) {
      props.model.retrievePlaylists()
    }
    window.history.pushState("", "", "/settings");
    dispatchEvent(new PopStateEvent('popstate', {}))
  }
}
