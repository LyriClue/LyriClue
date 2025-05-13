import { SuspenseView } from "../views/suspenseView"
import { getParamsFromUrl, urlContains } from "../utils/pathUtil";
import { signIn } from "../utils/firestoreModel";
import { Model } from "../Model";

export function SpotifyLanding(props: { model: Model; }) {
  if (urlContains("error")) {
    window.location.assign("/")
    window.history.pushState("", "", "/");
    dispatchEvent(new PopStateEvent('popstate', {}))
  } else if (urlContains("accessToken")) {
    const accessToken = getParamsFromUrl("accessToken") || ""
    const refreshToken = getParamsFromUrl("refreshToken") || ""
    window.localStorage.setItem("accessToken", accessToken)
    window.localStorage.setItem("refreshToken", refreshToken)
    signIn(accessToken, props.model).then(navigateToLanding)
  }

  return (
    <SuspenseView promise={Promise.resolve("logging in")} />
  )
}

function navigateToLanding() {
  window.history.pushState("", "", "/landing");
  dispatchEvent(new PopStateEvent('popstate', {}))
}
