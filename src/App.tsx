import './App.css'
import { ViteDefault } from './views/viteDefault';
import { SuspenseView } from './views/suspenseView'
import { RouterProvider, createHashRouter } from "react-router-dom";

function App(props: any) {
  console.log(props.model);

  if (!props.model.ready) {
    return (<SuspenseView promise="loading data" />)
  }

  return (
    <div>
      <RouterProvider router={makeRouter(props.model)} />
    </div>
  )
}

export function makeRouter(reactiveModel: any) {
  console.log(reactiveModel.ready);
  return createHashRouter([
    {
      path: "/",
      element: <ViteDefault />
    },
  ]);
}

export default App
