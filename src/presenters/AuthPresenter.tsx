import { AuthView } from "../views/AuthView"
import { observer } from "mobx-react-lite"

export const AuthPresenter = observer(
  function AuthPresenter(props) {

    return (
      <AuthView onSpotifyLogin={onSpotifyLoginACB} />
    )

    function onSpotifyLoginACB() {
      const authEndpoint = "https://accounts.spotify.com/authorize";
      const redirectUri = "http://localhost:5173/home"
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
      props.model.setToken(getTokenFromUrl().access_token)
      window.location = authEndpoint + "?" + searchparams
    }
  }

)
export const getTokenFromUrl = () => { // TODO: refactor to actual function
  return window.location.hash.substring(1).split('&').reduce((initial: object, item: string) => {
    let parts = item.split("=");
    initial[parts[0]] = decodeURIComponent(parts[1])
    return initial
  }, {});
}
