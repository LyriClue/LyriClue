// import { redirect, useNavigate } from "react-router-dom";
import { LandingView } from "../views/landingView";
// import { Link } from "react-router-dom"
import { getDailyPlaylists, signOutUser } from "../utils/firestoreModel";

export function LandingPresenter(props: any) {
  console.log("landingview");
  return (
    <LandingView
      playOwnPlaylist={PlayOwnPlaylistsACB}
      onLogout={onLogoutACB}
      previousGames={props.model.previousGames}
      playDailyPlaylist={PlayDailyPlaylistsACB}
      isGuest={props.model.userIsGuest()}
    />
  );

  function PlayOwnPlaylistsACB() {
    if (!props.model.playlists) {
      props.model.retrievePlaylists();
    }
    window.history.pushState("", "", "/settings");
    dispatchEvent(new PopStateEvent("popstate", {}));
  }

  function PlayDailyPlaylistsACB() {
    console.log("playing daily");

    getDailyPlaylists(props.model)
      .then(() => props.model.retrieveSongs())
      .then(() => props.model.startGame());
  }

  function onLogoutACB() {
    signOutUser();
  }
}
