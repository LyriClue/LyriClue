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


const App = observer(
  function AppRender(props: any) {

    if (!props.model.ready || props.model.user === undefined) {
      return (<SuspenseView promise={Promise.resolve("loading data")} />)
    }

    if (props.model.user == null) {
      window.history.pushState("", "", "/");
      dispatchEvent(new PopStateEvent('popstate', {}))
      return <AuthPresenter />
    }

    return (
      <div>
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
      element: <AuthPresenter />
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
    }

  ])
}

export default App
