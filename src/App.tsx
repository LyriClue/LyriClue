import './App.css'
import { SettingsPresenter } from './presenters/SettingsPresenter.tsx';
import { AuthPresenter } from './presenters/AuthPresenter.tsx'
import { SuspenseView } from './views/SuspenseView'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { observer } from 'mobx-react-lite';
import { SpotifyLanding } from './presenters/SpotifyLanding.tsx';
import { Game } from './presenters/GamePresenter.tsx';
import { LandingPresenter } from './presenters/LandingPresenter.tsx';
import './style.css'
import { PostGuessPresenter } from './presenters/PostGuessPresenter.tsx';
import { PostGamePresenter } from './presenters/PostGamePresenter.tsx';
import { Background } from './utils/ViewUtils.tsx';
import { Countdown } from './presenters/CountdownPresenter.tsx';
import { navigateTo } from './utils/pathUtil.tsx';

const App = observer(
  function AppRender(props: any) {

    if (!props.model.ready || props.model.user === undefined || props.model.showGlobalSuspense) {
      return (
        <div>
          {Background()}
          <SuspenseView promise={Promise.resolve("loading data")} />
        </div>
      )
    }

    if (props.model.user == null && window.location.pathname != "/home") {
      navigateTo("/")
      return (
        <div>
          {Background()}
          <AuthPresenter model={props.model} />
        </div>
      )
    }

    return (
      <div>
        {Background()}
        <RouterProvider router={makeRouter(props.model)} />
      </div>
    )
  }
)

export function makeRouter(reactiveModel: any) {
  return createBrowserRouter([
    {
      path: "/",
      element: <AuthPresenter model={reactiveModel} />
    },
    {
      path: "/home",
      element: <SpotifyLanding model={reactiveModel} />
    },
    {
      path: "/settings",
      element: <SettingsPresenter model={reactiveModel} />
    },
    {
      path: "/countdown",
      element: <Countdown model={reactiveModel} />
    },
    {
      path: "/game",
      element: <Game model={reactiveModel} />
    },
    {
      path: "/landing",
      element: <LandingPresenter model={reactiveModel} />
    },
    {
      path: "/post-guess",
      element: <PostGuessPresenter model={reactiveModel} />
    },
    {
      path: "/post-game",
      element: <PostGamePresenter model={reactiveModel} />
    }

  ])
}

export default App
