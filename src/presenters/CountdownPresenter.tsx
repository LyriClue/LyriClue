import { observer } from "mobx-react-lite"
import { Model } from "../Model"
import { CountdownView } from "../views/CountdownView"
import { useEffect } from "react"
import { SuspenseView } from "../views/SuspenseView"

interface countdownProps {
  model: Model
}


export const Countdown = observer(
  function countdownRender(props: countdownProps) {
    checkTimer()
    return (
      (modelHasSongs(props.model) &&
        < CountdownView currentValue={formatTimer(props.model.currentTime)} />) ||
      (<SuspenseView promise={props.model.songsPromiseState.promise} error={props.model.songsPromiseState.error} />)
    )


    function formatTimer(value: number) {
      return 3 - value
    }

    function checkTimer() {
      useEffect(() => {
        if (props.model.currentTime >= 3) {
          props.model.startGame()
        }
      }, [props.model.currentTime])
    }

    function modelHasSongs(model: Model) {
      return model.isPromiseResolved(model.songsPromiseState)
    }
  })
