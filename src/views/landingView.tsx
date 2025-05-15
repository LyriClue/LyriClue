import { HighScore } from "../Model";
import { Background, blackText, Logo, whiteText } from "./ViewUtils";
import "../style.css";


export function LandingView(props: any) {
  const highscoreArray = [1, 2, 3, 4, 5];
  const myHighscoreArray = [1, 2, 3, 4, 5];
  return (<div className="h-screen w-screen">
    {Logo("fixed")}

    {/* Main content */}
    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center">
      {/* High Score Section */}
      <HighscoreView highScores={props.highScores} previousGames={props.previousGames} isGuest={props.isGuest}/>

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
          <h1 className={blackText + "text-3xl md:text-5xl  mb-8 text-center "}>
            Start Game
          </h1>
          <div className="w-full flex flex-col items-center space-y-4">
            
            <button disabled={props.isGuest} className="text-xl  font-mono w-[300px] h-12  rounded-full bg-white hover:bg-gray-100 transition-colors shadow-md"
              onClick={props.playOwnPlaylist}>
              Play my own songs
            </button>
            <button onClick={props.playDailyPlaylist} className="text-xl  font-mono w-[300px] h-12  rounded-full bg-white hover:bg-gray-100 transition-colors shadow-md">
              Play daily playlist
            </button>
          </div>
        </div>

      </div >
    );
  }

  function HighscoreView(props: { highScores: HighScore[]; previousGames: any, isGuest: boolean }) {

    return (
      <div className="flex flex-col items-center md:items-start space-y-6 mb-8 md:mb-0 pt-30 w-[300px] md:pl-5">
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
      <div className="w-96 bg-black/40 rounded-tl-3xl rounded-bl-3xl relative right-0 h-screen rounded-3xl md:rounded-tr-none md:rounded-br-none" >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/40 to-black/80 rounded-3xl md:rounded-tr-none md:rounded-br-none " />
        <div className="relative z-10 flex flex-col items-center justify-center h-full p-6">

          <h1 className={whiteText + "flex-none text-3xl  mb-8 text-center "}>
            Profile
          </h1>
          <div className="flex-1 grow flex flex-col items-center justify-center">
            <div>
              <img src={props.profilePicture} alt="Profile Picture" className=" w-50 aspect-square rounded-full mb-4" />
              <p className={whiteText + "text-xl mb-8"}>{props.displayName}</p>
            </div>
          </div>
          <div className="flex-none w-full items-center space-y-4">
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
