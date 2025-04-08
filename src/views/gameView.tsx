function GameView(props: any) {
    console.log(props.lyric);
    return (
        <div className="h-screen w-screen ">
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
        <div className="relative items-center">
            <GameComponent />
        </div>
      </div>
    )

    function GameComponent(){
        return(
            <div>
            <span>
                <b>
                    {"... " + props.lyric + " ..."}
                </b>
            </span>
            <br />
            <progress value={props.progress} />
            <form action={props.postGameURL}>
                <label htmlFor="artist">Artist: </label>
                <input type="text" id="artist" name="artist" /><br />
                <label htmlFor="title">Title: </label>
                <input type="text" id="title" name="title" /><br />
                <input type="submit" value="submit" />
            </form>
        </div>
        );
    }
}

export { GameView }
