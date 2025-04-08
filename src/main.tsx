import { StrictMode } from 'react'
import { model } from './Model.tsx'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { observable, configure, reaction } from "mobx";
import { connectToPersistence } from './utils/firestoreModel.tsx'
configure({ enforceActions: "never", });  // we don't use Mobx actions

const reactiveModel = observable(model);

const metaViewport = document.createElement('meta');
metaViewport.name = "viewport";
metaViewport.content = "width=device-width, initial-scale=1";
document.head.appendChild(metaViewport);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App model={reactiveModel} />
  </StrictMode>,
)
window.myModel = reactiveModel

reaction(checkPlaylistACB, playlistEffectACB)
connectToPersistence(reactiveModel, reaction);

function checkPlaylistACB() {
  return reactiveModel.currentPlaylist
}

function playlistEffectACB() {
  reactiveModel.currentPlaylistEffect()
  console.log("ran current playlist effect");


}
