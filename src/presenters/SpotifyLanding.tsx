import { SuspenseView } from "../views/suspenseView"
import { getTokenFromUrl } from "./AuthPresenter"
import { useEffect } from "react";
import { urlContains } from "../utils/pathUtil";
import { signIn } from "../utils/firestoreModel";

export function SpotifyLanding(props: { model: { setToken(newToken: string): void }; }) {
  if (urlContains("error")) {
    window.history.pushState("", "", "/");
    dispatchEvent(new PopStateEvent('popstate', {}))
  } else {
    props.model.setToken(getTokenFromUrl().access_token)
    signIn(props.model.token).then(navigateToLanding)
  }
  
  return (
    <SuspenseView promise={Promise.resolve("logging in")} />
  )
}

function navigateToLanding() {
  window.history.pushState("", "", "/landing");
  dispatchEvent(new PopStateEvent('popstate', {}))
}
