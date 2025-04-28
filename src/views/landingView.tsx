
export function LandingView(props: any) {
  const highscoreArray = [1, 2, 3, 4, 5];
  const myHighscoreArray = [1, 2, 3, 4, 5];
  return (<div className="h-screen w-screen">
    {/* Background image */}
    <img
      className="fixed top-0 left-0 w-full h-full object-cover"
      src="https://lagn9w7j0a.ufs.sh/f/P2ljk8lEtN0jNStY88rhRy7bLpuOx8lWi1cdXHE6DMwT9Pvj"
      alt="Background"
    />
    <div className="w-full h-full left-0 top-0 fixed bg-zinc-300/20" />

    {/* Logo */}
    <div className="absolute top-4 left-0 w-full md:pl-5">
      <h1 className="text-2xl text-black mainfont text-center md:text-left [text-shadow:_0px_4px_8px_rgb(255_255_255_/_1.00)]">
        LyriClue
      </h1>
    </div>

    {/* Main content */}
    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center">
      {/* High Score Section */}
      <HighscoreView highscoreArray={highscoreArray} userHighscoreArray={myHighscoreArray} />

      {/* Start game section */}
      <ControlView />

      {/* Profile Section */}
      <ProfileSection />
    </div>
  </div>
  );

  function ControlView() {
    return (
      <div className="w-full md:w-2/3 flex flex-col items-center p-30">
        {/* Start Game */}
        <div className="w-full max-w-md flex flex-col items-center mb-12">
          <h1 className="text-3xl md:text-5xl mainfont text-black mb-8 text-center [text-shadow:_0px_4px_8px_rgb(255_255_255_/_1.00)]">
            Start Game
          </h1>
          <div className="w-full flex flex-col items-center space-y-4">
            <button onClick={props.playDailyPlaylist} className="text-xl  font-mono w-[300px] h-12  rounded-full bg-white hover:bg-gray-100 transition-colors shadow-md">
              Play daily playlist
            </button>
            <button disabled={props.isGuest} className="text-xl  font-mono w-[300px] h-12  rounded-full bg-white hover:bg-gray-100 transition-colors shadow-md"
              onClick={props.playOwnPlaylist}>
              Play my own songs
            </button>
          </div>
        </div>

      </div >
    );
  }

  function HighscoreView(props: { highscoreArray: number[]; userHighscoreArray: number[] }) {

    return (
      <div className="flex flex-col items-center md:items-start space-y-6 mb-8 md:mb-0 pt-30 w-[300px] md:pl-5">
        {/* Daily Playlist Highscores */}
        <div className="relative w-full max-w-sm">
          <div className="relative bg-white p-4  shadow-[-8px_8px_0px_0px_rgba(0,0,0,1)] w-[300px]">
            <p className="text-center text-black text-2xl font-mono leading-10 mb-1">
              High Score
            </p>
            <p className="text-center text-black text-sm  font-mono leading-snug mb-3">
              Daily playlist
            </p>
            <table className="w-full text-black text-sm  font-mono leading-snug">
              <tbody>{props.highscoreArray.map(HighScoreTableCB)}</tbody>
            </table>
          </div>
        </div>

        {/* My Own Songs Highscores */}
        <div className="relative w-full max-w-sm">
          <div className="relative bg-white p-4  shadow-[-8px_8px_0px_0px_rgba(0,0,0,1)] w-[300px]">
            <p className="text-center text-black text-2xl font-mono leading-10 mb-1">
              My High Score
            </p>
            <p className="text-center text-black text-sm  font-mono leading-snug mb-3">
              My own songs
            </p>
            <table className="w-full text-black text-sm  font-mono leading-snug">
              <tbody>{props.userHighscoreArray.map(HighScoreTableCB)}</tbody>
            </table>
          </div>
        </div>
      </div>
    );

    function HighScoreTableCB(index: number) {
      return (
        <tr key={index} className="border-b border-gray-200 last:border-0">
          <td className="py-1">Person {index}</td>
          <td className="py-1 px-2">......</td>
          <td className="py-1">Xpts</td>
        </tr>
      );

    }



  }

  function ProfileSection() {
    return (
      <div className="w-96 bg-black/40 rounded-tl-3xl rounded-bl-3xl relative right-0 h-screen rounded-3xl md:rounded-tr-none md:rounded-br-none" >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/40 to-black/80 rounded-3xl md:rounded-tr-none md:rounded-br-none " />
        <div className="relative z-10 flex flex-col items-center justify-center h-full p-6">
          <h1 className="text-3xl mainfont text-white mb-8 text-center [text-shadow:_0px_4px_8px_rgb(255_255_255_/_1.00)]">
            Profile
          </h1>
          <div className="w-full flex flex-col items-center space-y-4">

            <button onClick={onLogoutACB} className="text-xl  font-mono w-[300px] h-12  rounded-full bg-white hover:bg-gray-100 transition-colors shadow-md">
              Log out
            </button>
          </div>
        </div>
      </div>
    )
  }

  function onLogoutACB() {
    props.onLogout();
  }
}
