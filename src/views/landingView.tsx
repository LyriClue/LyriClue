import { HighscoreView } from "../views/highscoreView";
import { ControlView } from "../views/landingControllView";
import { ProfileSection } from "../views/profileSelectionView";

export function LandingView(props: any) {
    const highscoreArray = [1, 2, 3, 4, 5];
    const myHighscoreArray = [1, 2, 3, 4, 5];
    return (<div className="h-screen w-screen ">
        {/* Background image */}
        <img
          className="fixed top-0 left-0 w-full h-full object-cover"
          src="src/assets/background.jpg"
          alt="Background"
        />
        <div className="w-full h-full left-0 top-0 fixed bg-zinc-300/20" />
  
        {/* Logo */}
        <div className="absolute top-4 left-0 w-full">
          <h1 className="text-2xl text-black mainfont text-center md:text-left [text-shadow:_0px_4px_8px_rgb(255_255_255_/_1.00)]">
            LyriClue
          </h1>
        </div>
  
        {/* Main content */}
        <div className="relative z-10 flex flex-col md:flex-row justify-between pl-4 items-center">
          {/* High Score Section */}
          <HighscoreView highscoreArray={highscoreArray} userHighscoreArray={myHighscoreArray} />
  
          {/* Start game section */}
          <ControlView playOwnPlaylist={PlayOwnPlaylistsACB} />
  
          {/* Profile Section */}
          <ProfileSection />
        </div>
      </div>
    );

    function PlayOwnPlaylistsACB() {
        window.history.pushState("", "", "/settings");
        dispatchEvent(new PopStateEvent('popstate', {}))
      }
}