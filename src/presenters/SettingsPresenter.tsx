import { SettingsView } from "../views/SettingsView"
import { observer } from "mobx-react-lite"
import { SuspenseView } from "../views/suspenseView"


export const Settings = observer(
  function SettingsPresenter(props: any) {
    return (
      <div>
        {(isPromiseResolved(props.model) &&
          < SettingsView
            playlists={props.model.playlistsPromiseState.data.items}
            previous={props.model.playlistsPromiseState.data.previous}
            next={props.model.playlistsPromiseState.data.next}
            onSelectPrevious={selectPreviousPlaylistPageACB}
            onSelectNext={selectNextPlaylistPageACB}
            selectPlaylist={selectPlaylistACB}
          />
        )
          || (<SuspenseView promise={props.model.playlistsPromiseState.promise} error={props.model.playlistsPromiseState.error} />)}
      </div>
    )

    function isPromiseResolved(model) {
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
    function selectPlaylistACB(playlist) {
      console.log("set current playlist: ", playlist);

      props.model.setCurrentPlaylist(playlist)
    }
  }

)

