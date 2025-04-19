import { useNavigate } from "react-router"
import { SuspenseView } from "../views/suspenseView"
import { getTokenFromUrl } from "./AuthPresenter"
import { useEffect } from "react";
import { urlContains } from "../utils/pathUtil";

export function SpotifyLanding(props: { model: { setToken(newToken: string): void }; }) {
  if (urlContains("error")) {
    window.history.pushState("", "", "/");
    dispatchEvent(new PopStateEvent('popstate', {}))
  } else {
    props.model.setToken(getTokenFromUrl().access_token)
    // Probably needs something like: window.location.hash = "" ,
    // or handle the token like karaokify does
    const navigate = useNavigate()
    useEffect(() => {
      navigate("/landing")
    }, [])
  }

  return (
    <SuspenseView promise={Promise.resolve("logging in")} />
  )
}
