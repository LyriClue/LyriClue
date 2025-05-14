import './App.css'
import { Settings } from './presenters/SettingsPresenter.tsx';
import { AuthPresenter } from './presenters/AuthPresenter.tsx'
import { ViteDefault } from './views/viteDefault';
import { SuspenseView } from './views/suspenseView'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { observer } from 'mobx-react-lite';
import { SpotifyLanding } from './presenters/SpotifyLanding.tsx';
import { Game } from './presenters/gamePresenter.tsx';
import { LandingPresenter } from './presenters/landingPresenter.tsx';
import './style.css'
import { PostGuessPresenter } from './presenters/postGuess.tsx';
import { PostGamePresenter } from './presenters/PostGamePresenter.tsx';
import { Background } from './views/ViewUtils.tsx';
import { Countdown } from './presenters/CountdownPresenter.tsx';

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
      window.history.pushState("", "", "/");
      dispatchEvent(new PopStateEvent('popstate', {}))
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
      path: "/vite",
      element: <ViteDefault />
    },
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
      element: <Settings model={reactiveModel} />
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
