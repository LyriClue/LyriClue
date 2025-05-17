import { Model } from "../Model";
import { signInAnonymous } from "../utils/firestoreModel";
import { AuthView } from "../views/AuthView"
import { observer } from "mobx-react-lite"

export const AuthPresenter = observer(
  function AuthPresenterRender(props: { model: Model }) {
    return (
      <AuthView
        onSpotifyLogin={onSpotifyLoginACB}
        onGuestLogin={onGuestLoginACB}
      />
    );

    function onSpotifyLoginACB() {
      window.location.assign(`${window.location.origin}/api/auth/login`);
    }

    function onGuestLoginACB() {
      signInAnonymous(props.model).then(navigateToLanding);
    }
  }
);

function navigateToLanding() {
  window.history.pushState("", "", "/landing");
  dispatchEvent(new PopStateEvent("popstate", {}));
}

