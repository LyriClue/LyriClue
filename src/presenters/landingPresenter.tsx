import { redirect, useNavigate } from "react-router-dom";
import { LandingView } from "../views/landingView";
import { Link } from "react-router-dom"


export function LandingPresenter(props: any) {
  console.log("landingview");
  return (
    <LandingView/>
  );
}
