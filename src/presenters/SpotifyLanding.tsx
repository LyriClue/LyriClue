import { useNavigate } from "react-router"
import { SuspenseView } from "../views/suspenseView"
import { getTokenFromUrl } from "./AuthPresenter"
import { useEffect } from "react";

export function SpotifyLanding(props) {
  props.model.setToken(getTokenFromUrl().access_token)
  // Probably needs something like: window.location.hash = "" ,
  // or handle the token like karaokify does
  const navigate = useNavigate()
  useEffect(() => {
    navigate("/settings")
  }, [])

  return (
    <SuspenseView promise="logging ing" />
  )
}
