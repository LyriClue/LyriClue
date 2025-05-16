import { PlaylistSelectionView } from "../views/PlaylistSelectionView"
import { observer } from "mobx-react-lite"
import { SuspenseView } from "../views/suspenseView"
// import { Difficulty } from "../Model"
import { DifficultyView } from "../views/difficultyView"
import { Model } from "../Model"


export const Settings = observer(
  function SettingsPresenter(props: any) {
    return (
      <div>
        <DifficultyView
          selectDifficulty={selectDifficulty}
          selectSpeed={selectSpeedAcb}
          currentDifficulty={props.model.difficulty}
          selectTime={selectTimePerRound}
          timeValue={props.model.maxTime}
          speedValue={timeToSpeedValue(props.model.timeBetweenLyricLines)}
        />
        {
          (modelHasPlaylists(props.model) &&
            <div>
              < PlaylistSelectionView
                errorMessage={props.model.PlaylistErrorMessage}
                playlists={props.model.playlists.items}
                previous={props.model.playlists.previous}
                next={props.model.playlists.next}
                onSelectPrevious={selectPreviousPlaylistPageACB}
                onSelectNext={selectNextPlaylistPageACB}
                selectPlaylist={selectPlaylistACB}
                refreshPlaylists={refreshPlaylistsACB}
                navigateToMenu={goToMenuACB}
              />
            </div>)
          ||
          (<SuspenseView promise={props.model.playlistsPromiseState.promise} error={props.model.playlistsPromiseState.error} noPromiseMessage={"can't find playlists"} />)
        }
      </div>
    )

    function modelHasPlaylists(model: Model) {

      let promise = model.isPlaylistPromiseResolved()
      const promiseDoesNotExist = promise === undefined // HACK: Since isPromiseResolved returns null when loading
      return (
        (model.playlists && promiseDoesNotExist) || promise
      )
    }


    function selectNextPlaylistPageACB() {
      props.model.retrieveNextPlaylistPage()
    }
    function selectPreviousPlaylistPageACB() {
      props.model.retrievePreviousPlaylistPage()
    }
    function selectPlaylistACB(playlist: any) {
      props.model.setCurrentPlaylist(playlist)
    }
    function selectDifficulty(difficulty: any) {
      props.model.difficulty = difficulty
    }
    function refreshPlaylistsACB() {
      props.model.retrievePlaylists()
    }
    function selectSpeedAcb(value: number) {
      props.model.timeBetweenLyricLines = speedValueToTime(value);
      console.log((speedValueToTime(value)));
    }
    function speedValueToTime(value: number) {
      return 5 - (value / (10 / 4))
    }
    function timeToSpeedValue(value: number) {
      return (10 / 4) * (5 - value)
    }
    function selectTimePerRound(value: number) {

      props.model.maxTime = value
    }

    function goToMenuACB() {
      window.history.pushState("", "", "/landing");
      dispatchEvent(new PopStateEvent('popstate', {}))
    }
  }

)

