// import { Difficulty } from "../Model";

export function PlaylistSelectionView(props: any) {
  return (
    <div>

      <h1>Choose a Playlist!</h1>
      <table>
        {props.playlists.map(renderPlaylistsCB)}
      </table>
      <div>
        <button disabled={!props.previous} onClick={selectPrevious}>
          Previous
        </button>
        <button disabled={!props.next} onClick={selectNext}>
          Next
        </button>
      </div>

    </div>
  )
  function renderPlaylistsCB(playlist: any) {

    return (
      <tr>

        <td>
          {(playlist.images && <img height="50" width="50" src={playlist.images[playlist.images.length - 1].url} />) || "?"} {/*length -1 to get the last and smallest image'*/}
        </td >
        <td>
          {playlist.name}
        </td>
        <td>
          <button disabled={playlist.tracks.total < 5 || !playlist.isValidPlaylist} onClick={selectPlaylistACB}>Play!</button>
        </td>
      </tr>
    )
    function selectPlaylistACB() {
      console.log("Selected Playlist");
      props.selectPlaylist(playlist)
    }
  }

  function selectPrevious() {
    console.log("previous");
    props.onSelectPrevious()
  }

  function selectNext() {
    console.log("next");
    props.onSelectNext()
  }


}

