import { PlaylistSelectionView } from "../views/PlaylistSelectionView"
import { observer } from "mobx-react-lite"
import { SuspenseView } from "../views/suspenseView"
// import { Difficulty } from "../Model"
import { DifficultyView } from "../views/difficultyView"


export const Settings = observer(
  function SettingsPresenter(props: any) {
    return (
      <div>
        <DifficultyView
          selectDifficulty={selectDifficulty}
          currentDifficulty={props.model.difficulty}
        />
        {
          (isPromiseResolved(props.model) &&
            <div>
              < PlaylistSelectionView
                playlists={props.model.playlistsPromiseState.data.items}
                previous={props.model.playlistsPromiseState.data.previous}
                next={props.model.playlistsPromiseState.data.next}
                onSelectPrevious={selectPreviousPlaylistPageACB}
                onSelectNext={selectNextPlaylistPageACB}
                selectPlaylist={selectPlaylistACB}
              />
            </div>)
          ||
          (<SuspenseView promise={props.model.playlistsPromiseState.promise} error={props.model.playlistsPromiseState.error} noPromiseMessage={"can't find playlists"} />)
        }
      </div>
    )

    function isPromiseResolved(model: { playlistsPromiseState: { promise: any; data: any; error: any } }) {
      return (
        model.playlistsPromiseState.promise &&
        model.playlistsPromiseState.data &&
        !model.playlistsPromiseState.error
      );
    }

    function selectNextPlaylistPageACB() {
      props.model.retrieveNextPlaylistPage()
    }
    function selectPreviousPlaylistPageACB() {
      props.model.retrievePreviousPlaylistPage()
    }
    function selectPlaylistACB(playlist: any) {
      console.log("set current playlist: ", playlist);
      window.history.pushState("", "", "/game");
      dispatchEvent(new PopStateEvent('popstate', {}))
      props.model.setCurrentPlaylist(playlist)
      props.model.currentSong = 0
      props.model.startTimer()

    }
    function selectDifficulty(difficulty: any) {
      props.model.difficulty = difficulty
    }
  }

)

