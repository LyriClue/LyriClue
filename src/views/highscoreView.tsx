export function HighscoreView(props: any) {
  return (
    <div className="flex flex-col items-center md:items-start space-y-6 mb-8 md:mb-0 pt-30 w-[300px]">
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
        <td className="py-1">Person {index + 1}</td>
        <td className="py-1 px-2">......</td>
        <td className="py-1">Xpts</td>
      </tr>
    );

  }



}
