import { HighScore } from "../Model";
import "../style.css";


export function LandingView(props: any) {
  return (<div className="h-screen w-screen">
    {/* Main content */}
    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center ">
      {/* Start game section */}

      <div className="order-2 md:order-1">
        {/* High Score Section */}
        <HighscoreView highScores={props.highScores} previousGames={props.previousGames} isGuest={props.isGuest} />
      </div>
      <div className="order-1 md:order-2 items-center">
        <ControlView />
      </div>

      <div className="order-3">
        {/* Profile Section */}
        <ProfileSection />
      </div>

    </div>
  </div>
  );

  function ControlView() {
    return (
      <div className="w-full">
        {/* Start Game */}
        <div className="w-full max-w-md flex flex-col mb-12">
          <h1 className="blackText text-3xl md:text-5xl mb-8 text-center m-5 ">
            Start Game
          </h1>
          <div className="w-full flex flex-col space-y-4 items-center">

            <button disabled={props.isGuest} className="font-mono w-[250px] h-12  rounded-full bg-white hover:bg-gray-100 disabled:pointer-events-none transition-colors shadow-md"
              onClick={props.playOwnPlaylist}>
              Play my own songs
            </button>
            <button onClick={props.playDailyPlaylist} className="font-mono w-[250px] h-12  rounded-full bg-white hover:bg-gray-100 transition-colors shadow-md">
              Play daily playlist
            </button>
          </div>
        </div>

      </div >
    );
  }

  function HighscoreView(props: { highScores: HighScore[]; previousGames: any, isGuest: boolean }) {

    return (
      <div className="flex flex-col items-center md:items-start space-y-6 mb-8 md:mb-0 md:pt-30 w-[300px] md:pl-5">
        {HighScoreTableComponent("High Score", "Daily Playlist", props.highScores.map(HighScoreTableCB))}
        <div hidden={props.isGuest}>
          {HighScoreTableComponent("Previous Games", "My Own Playlists", props.previousGames.map(PreviousGamesTableCB))}
        </div>
      </div>
    );


    function HighScoreTableComponent(title: string, subTitle: string, elements: any) {
      return <div className="relative w-full max-w-sm">
        <div className="relative bg-white p-4  shadow-[-8px_8px_0px_0px_rgba(0,0,0,1)] w-[300px]">
          <p className="text-center text-black text-2xl font-mono leading-10 mb-1">
            {title}
          </p>
          <p className="text-center text-black text-sm  font-mono leading-snug mb-3">
            {subTitle}
          </p>
          <table className="w-full text-black text-sm  font-mono leading-snug">
            <tbody>{elements}</tbody>
          </table>
        </div>
      </div>
    }

    function HighScoreTableCB(highScore: HighScore) {
      return (
        <tr key={highScore.userId} className="border-b border-gray-200 last:border-0">
          <td className="py-1">
            <a href={"https://open.spotify.com/user/" + highScore.userId} target="_blank" rel="noopener noreferrer">
              {highScore.userName}
            </a></td>
          <td className="py-1 px-2">......</td>
          <td className="py-1">{highScore.score} pts</td>
        </tr>
      );

    }

    function PreviousGamesTableCB(previousGames: any, index: number) {
      let playlistname = previousGames.playlistName || "";
      const difficulty = previousGames.difficulty || "";
      const score = previousGames.score || 0;
      if (playlistname.length > 10) {
        playlistname = playlistname.substring(0, 10) + "...";
      }
      return (
        <tr key={index} className="border-b border-gray-200 last:border-0">
          <td className="py-1">
            {previousGames.playlistId ? (
              <a href={"https://open.spotify.com/playlist/" + previousGames.playlistId} target="_blank" rel="noopener noreferrer">
                {playlistname}
              </a>
            ) : (
              <span className="text-gray-500">{playlistname}</span>
            )}
          </td>
          <td className="py-1 px-2">   </td>
          <td className="py-1">{difficulty + ": " + score + "pts"}</td>
        </tr>
      );

    }



  }

  function ProfileSection() {
    return (
      <div className="bg-black/40 p-5 rounded-tl-3xl rounded-bl-3xl relative right-0 z-10 flex flex-col items-center justify-center md:h-screen w-screen md:max-w-[300px] bg-gradient-to-b from-black/40 to-black/80 rounded-3xl md:rounded-tr-none md:rounded-br-none "  >
        <h1 className="whiteText flex-none text-3xl text-center ">
          Profile
        </h1>
        <div className="flex-1 grow flex flex-col items-center justify-center">
          <div>
            <img src={props.profilePicture} alt="Profile Picture" className=" w-50 aspect-square rounded-full mb-4" />
            <p className="whiteText text-xl mb-8">{props.displayName}</p>
          </div>
        </div>
        <div className="items-center space-y-4 w-full">
          {buttonRender()}
        </div>
      </div>

    )
  }

  function onLogoutACB() {
    props.onLogout();
  }
  function buttonRender() {
    return (
      <button onClick={onLogoutACB} className="text-xl font-mono h-12 w-full rounded-full bg-white hover:bg-gray-100 transition-colors shadow-md">
        {props.isGuest ? "Sign in" : "Log Out"}
      </button>
    )
  }
}
