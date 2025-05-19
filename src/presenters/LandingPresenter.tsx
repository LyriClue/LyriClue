import { LandingView } from "../views/LandingView";
import { getDailyPlaylists, signOutUser } from "../utils/firestoreModel";
import { observer } from "mobx-react-lite";
import { navigateTo } from "../utils/pathUtil";


export const LandingPresenter = observer(
  function LandingPresenterRender(props: any) {
    return (
      <LandingView playOwnPlaylist={PlayOwnPlaylistsACB}
        onSignIn={onSignInACB}
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
      if (!props.model.playlistsPromiseState.data) {
        props.model.retrievePlaylists()
      }
      navigateTo("/settings")
      props.model.setPlaylistErrorMessage("");
    }

    function PlayDailyPlaylistsACB() {
      props.model.difficulty = "medium";

      getDailyPlaylists(props.model)
        .then(() => props.model.retrieveSongs())
    }

    function onLogoutACB() {
      signOutUser();
    }
    function onSignInACB() {
      window.location.assign(window.location.protocol + '//' + window.location.hostname + '/api/auth/login');
    }
  }
)
