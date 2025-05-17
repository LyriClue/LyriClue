
import { blackText } from "./ViewUtils";

export function PlaylistSelectionView(props: any) {
  return (
    <div className="relative w-full h-[30%]">

      {/* Playlist Content */}
      <div className="relative z-20 p-8">
        <h1 className={blackText + "text-3xl  mb-4"}>Choose a Playlist!</h1>
        <span className="font-mono text-red-600 ">{showErrorMessage()}</span>
        <div className="rounded-xl p-3 bg-black/70 mb-4">
          <table className="w-full divide-y divide-black-200 border-spacing-y-2 ">
            <tbody>
              {props.playlists.map(renderPlaylistsCB)}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 mr-2.5"
            disabled={!props.previous}
            onClick={selectPrevious}
          >
            Previous
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 mr-2.5"
            disabled={!props.next}
            onClick={selectNext}
          >
            Next
          </button>

        </div>
      </div >
    </div >
  );

  function showErrorMessage() {
    if (props.errorMessage !== "") {
      return (
        <div className="text-red-600 font-mono">
          <span>Invalid playlist. Please choose another playlist</span>
        </div>
      );
    }
  }

  function renderPlaylistsCB(playlist: any) {
    return (
      <tr key={playlist.id} className="py-5 first:border-t-0 border-t-1 border-y-black/30">
        <td>
          {(playlist.images && (
            <img
              src={playlist.images[playlist.images.length - 1].url}
              alt="Playlist"
              className="h-12 w-12 aspect-square"
            />
          )) || "?"}
        </td>
        <td className="px-3 font-mono [text-shadow:_0px_1px_2px_rgb(0_0_0_/_1.00)]">{playlist.name}</td>
        <td className="py-1">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={selectPlaylistACB}
          >
            Play!
          </button>
        </td>
      </tr>
    );

    function selectPlaylistACB() {
      console.log("Selected Playlist");
      props.selectPlaylist(playlist);
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
