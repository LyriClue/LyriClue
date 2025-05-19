import { SuspenseView } from "../views/SuspenseView"
import { getParamsFromUrl, navigateTo, urlContains } from "../utils/pathUtil";
import { signIn } from "../utils/firestoreModel";
import { Model } from "../Model";

export function SpotifyLanding(props: { model: Model; }) {
  if (urlContains("error")) {
    window.location.assign("/")
    navigateTo("/")
  } else if (urlContains("accessToken")) {
    const accessToken = getParamsFromUrl("accessToken") || ""
    const refreshToken = getParamsFromUrl("refreshToken") || ""
    window.localStorage.setItem("accessToken", accessToken)
    window.localStorage.setItem("refreshToken", refreshToken)
    signIn(accessToken, props.model).then(() => navigateTo("/landing"))
  }

  return (
    <SuspenseView promise={Promise.resolve("logging in")} />
  )
}

