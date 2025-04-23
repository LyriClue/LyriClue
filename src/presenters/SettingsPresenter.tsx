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
          (modelHasPlaylists(props.model) &&
            <div>
              < PlaylistSelectionView
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

    function modelHasPlaylists(model: { playlists: any }) {
      return (
        model.playlists && true
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
      props.model.setCurrentPlaylist(playlist)
      props.model.startGame()

    }
    function selectDifficulty(difficulty: any) {
      props.model.difficulty = difficulty
    }
    function refreshPlaylistsACB() {
      props.model.retrievePlaylists()
    }

    function goToMenuACB() {
      window.history.pushState("", "", "/landing");
      dispatchEvent(new PopStateEvent('popstate', {}))
    }
  }

)

