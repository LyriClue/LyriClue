import './App.css'
import { AuthPresenter } from './presenters/AuthPresenter.tsx'
import { ViteDefault } from './views/viteDefault';
import { SuspenseView } from './views/suspenseView'
import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import { observer } from 'mobx-react-lite';

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
      path: "/home",
      element: <ViteDefault />
    },
    {
      path: "/",
      element: <AuthPresenter model={reactiveModel} />
    }
  ])
  // return createHashRouter([
  //   {
  //     path: "/",
  //     element: <AuthPresenter />
  //   },
  //   {
  //     path: "/home",
  //     element: <ViteDefault />
  //   },
  //   // {
  //   //   path: "/spotify-login",
  //   //   element: <SpotifyLogin />
  //   // }
  // ]);
}

export default App
