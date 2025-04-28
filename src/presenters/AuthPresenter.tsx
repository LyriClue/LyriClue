import { signInAnonymous } from "../utils/firestoreModel";
import { AuthView } from "../views/AuthView"
import { observer } from "mobx-react-lite"

export const AuthPresenter = observer(
  function AuthPresenterRender() {

    return (
      <AuthView onSpotifyLogin={onSpotifyLoginACB} onGuestLogin={onGuestLoginACB} />
    )

    function onSpotifyLoginACB() {
      const authEndpoint = "https://accounts.spotify.com/authorize";
      const redirectUri = `${window.location.origin}/home`;
      const clientId = "0f96e0b07475401cb8595b62238e4d2f"
      const scopes =
        "playlist-read-private user-top-read"
      const searchparams = new URLSearchParams({
        client_id: clientId,
        scope: scopes,
        redirect_uri: redirectUri,
        response_type: "token",
        show_dialog: "true"
      })

      window.location.assign(authEndpoint + "?" + searchparams)
    }

    function onGuestLoginACB() {
      signInAnonymous().then(navigateToLanding)
    }
  }

)

function navigateToLanding() {
  window.history.pushState("", "", "/landing")
  dispatchEvent(new PopStateEvent('popstate', {}))
}

export const getTokenFromUrl = () => { // TODO: Move to appropriate place
  return window.location.hash.substring(1).split('&').reduce((initial: { [key: string]: any }, item: string) => {
    let parts = item.split("=");
    initial[parts[0]] = decodeURIComponent(parts[1]);
    return initial;
  }, {});
}
