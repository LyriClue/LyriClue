import './App.css'
import { Settings } from './presenters/SettingsPresenter.tsx';
import { AuthPresenter } from './presenters/AuthPresenter.tsx'
import { ViteDefault } from './views/viteDefault';
import { SuspenseView } from './views/suspenseView'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { observer } from 'mobx-react-lite';
import { SpotifyLanding } from './presenters/SpotifyLanding.tsx';
import { LandingView } from './views/landingView.tsx';
import './style.css'


const App = observer(
  function AppRender(props: any) {

    if (!props.model.ready) {
      return (<SuspenseView promise="loading data" />)
    }

    return (
      <div>
        <RouterProvider router={makeRouter(props.model)} />
      </div>
    )
  }
)

export function makeRouter(reactiveModel: object) {
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
      path: "/landing",
      element: <LandingView />
    }
  ])
}

export default App
