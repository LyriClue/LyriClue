export function PlaylistSelectionView(props: any) {
  return (
    <div className="relative w-full h-[30%]">
      <img
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
        src="https://lagn9w7j0a.ufs.sh/f/P2ljk8lEtN0jrczxxbYEFvcduPT5sY8H9An067qykmOl4RNo"
        alt="Background"
      />
      <div className="fixed top-0 left-0 w-full h-full bg-zinc-300/20 z-10" />

      {/* Playlist Content */}
      <div className="relative z-20 p-8">
        <h1 className="text-3xl mainfont text-black mb-4 [text-shadow:_0px_4px_8px_rgb(255_255_255_/_1.00)]">Choose a Playlist!</h1>
        <table className="w-full mb-4 ">
          {props.playlists.map(renderPlaylistsCB)}
        </table>
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
        <button
          className="px-4 py-2 text-white rounded mt-4"
          onClick={navigateToMenu}
        >
          Back to Menu
        </button>
      </div>
    </div>
  );

  function renderPlaylistsCB(playlist: any) {
    return (
      <tr key={playlist.id}>
        <td>
          {(playlist.images && (
            <img
              height="50"
              width="50"
              src={playlist.images[playlist.images.length - 1].url}
              alt="Playlist"
            />
          )) || "?"}
        </td>
        <td className="font-mono [text-shadow:_0px_1px_2px_rgb(0_0_0_/_1.00)]">{playlist.name}</td>
        <td>
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
  
  function navigateToMenu() {
    console.log("Navigating to menu");
    props.navigateToMenu();
  }
}