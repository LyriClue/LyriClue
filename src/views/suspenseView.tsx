interface SuspenseViewProps {
  promise?: Promise<any>;
  error?: Error;
  noPromiseMessage?: string;
  returnToSettings: Function;
}

export function SuspenseView(props: SuspenseViewProps) {
  function returnButton(){
    props.returnToSettings()
  }

  if (!props.promise) return <span>{props.noPromiseMessage || "no data"}</span>;
  if (props.error) {
    return (
    <div>
      <span>The chosen playlist is not valid.</span>
      <button onClick={returnButton}>Return</button>
    </div>
    );
  }

  return <img src="https://brfenergi.se/iprog/loading.gif" alt="Loading..." />;
}
