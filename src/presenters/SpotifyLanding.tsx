import { SuspenseView } from "../views/suspenseView"
import { getTokenFromUrl } from "./AuthPresenter"
import { getParamsFromUrl, urlContains } from "../utils/pathUtil";
import { signIn } from "../utils/firestoreModel";
import { Model } from "../Model";

export function SpotifyLanding(props: { model: Model; }) {
  if (urlContains("error")) {
    window.history.pushState("", "", "/");
    dispatchEvent(new PopStateEvent('popstate', {}))
  } else {
    const code = getParamsFromUrl("code")
    signIn(code, props.model).then(navigateToLanding)
  }

  return (
    <SuspenseView promise={Promise.resolve("logging in")} />
  )
}

function navigateToLanding() {
  window.history.pushState("", "", "/landing");
  dispatchEvent(new PopStateEvent('popstate', {}))
}
