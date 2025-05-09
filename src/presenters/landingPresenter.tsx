// import { redirect, useNavigate } from "react-router-dom";
import { LandingView } from "../views/landingView";
// import { Link } from "react-router-dom"
import { getDailyPlaylists, signOutUser } from "../utils/firestoreModel";
import { observer } from "mobx-react-lite";


export const LandingPresenter = observer(
  function LandingPresenterRender(props: any) {
    return (
      <LandingView playOwnPlaylist={PlayOwnPlaylistsACB}
        onLogout={onLogoutACB}
        previousGames={props.model.previousGames}
        playDailyPlaylist={PlayDailyPlaylistsACB}
        isGuest={props.model.userIsGuest()}
        profilePicture={props.model.user.photoURL}
        displayName={props.model.user.displayName}
        highScores={props.model.highScores}
      />
    );

    function PlayOwnPlaylistsACB() {
      if (!props.model.playlists) {
        props.model.retrievePlaylists()
      }
      window.history.pushState("", "", "/settings");
      props.model.setPlaylistErrorMessage("");
      dispatchEvent(new PopStateEvent('popstate', {}))
    }

    function PlayDailyPlaylistsACB() {
      console.log("playing daily");

      getDailyPlaylists(props.model)
        .then(() => props.model.retrieveSongs())
        .then(() => props.model.startGame())
    }

    function onLogoutACB() {
      signOutUser();
    }
  }
)
