import './App.css'
import { ViteDefault } from './views/viteDefault';
import { SuspenseView } from './views/suspenseView'
import { RouterProvider, createHashRouter } from "react-router-dom";
import { observer } from 'mobx-react-lite';

const App = observer(
  function App(props: any) {

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

export function makeRouter(reactiveModel: any) {
  return createHashRouter([
    {
      path: "/",
      element: <ViteDefault />
    },
  ]);
}

export default App
