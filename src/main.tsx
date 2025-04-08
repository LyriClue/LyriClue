import { StrictMode } from 'react'
import { model } from './Model.tsx'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { observable, configure, reaction } from "mobx";
import { connectToPersistence } from './utils/firestoreModel.tsx'
configure({ enforceActions: "never", });  // we don't use Mobx actions

const reactiveModel = observable(model);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App model={reactiveModel} />
  </StrictMode>,
)
window.myModel = reactiveModel

// reaction(checkTimerACB, timerEffectACB)
connectToPersistence(reactiveModel, reaction);

// function checkTimerACB() {
//   return reactiveModel.currentTime
// }
//
// function timerEffectACB() {
//   reactiveModel.currentTimeEffect()
// }
//
