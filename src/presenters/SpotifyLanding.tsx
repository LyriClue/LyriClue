import { SuspenseView } from "../views/suspenseView"
import { getTokenFromUrl } from "./AuthPresenter"
import { signIn } from "../utils/firestoreModel";

export function SpotifyLanding(props: { model: { token: string, setToken(newToken: string): void }; }) {
  props.model.setToken(getTokenFromUrl().access_token)
  signIn(props.model.token).then(navigateToLanding)

  return (
    <SuspenseView promise={Promise.resolve("logging in")} />
  )
}
function navigateToLanding() {
  window.history.pushState("", "", "/landing");
  dispatchEvent(new PopStateEvent('popstate', {}))
}
