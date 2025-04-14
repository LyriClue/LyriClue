import { useNavigate } from "react-router"
import { SuspenseView } from "../views/suspenseView"
import { getTokenFromUrl } from "./AuthPresenter"
import { useEffect } from "react";
import { getFirebaseToken } from "../utils/firestoreModel";

export function SpotifyLanding(props: { model: { token: string, setToken(newToken: string): void }; }) {
  props.model.setToken(getTokenFromUrl().access_token)
  getFirebaseToken(props.model.token)

  // Probably needs something like: window.location.hash = "" ,
  // or handle the token like karaokify does
  const navigate = useNavigate()
  useEffect(() => {
    navigate("/landing")
  }, [])

  return (
    <SuspenseView promise={Promise.resolve("logging in")} />
  )
}
