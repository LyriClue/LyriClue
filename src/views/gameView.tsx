function GameView(props: any) {
    console.log(props.lyric);
    return (
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
    )
}

export { GameView }
