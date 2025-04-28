// import { redirect, useNavigate } from "react-router-dom";
import { LandingView } from "../views/landingView";
// import { Link } from "react-router-dom"
import { signOutUser} from "../utils/firestoreModel";


export function LandingPresenter(props: any) {
  console.log("landingview");
  return (

    <LandingView playOwnPlaylist={PlayOwnPlaylistsACB} 
                onLogout={onLogoutACB}
                isGuest={props.model.userIsGuest()}
    />
  );

  function PlayOwnPlaylistsACB() {
    if (!props.model.playlists) {
      props.model.retrievePlaylists()
    }
    window.history.pushState("", "", "/settings");
    dispatchEvent(new PopStateEvent('popstate', {}))
  }
  function onLogoutACB() {
    signOutUser();
  }
}
