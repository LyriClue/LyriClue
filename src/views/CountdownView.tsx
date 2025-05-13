import { blackText } from "./ViewUtils";

export function CountdownView(props: any) {
  return (
    <div className="flex flex-col relative w-screen items-center">
      <h2 className={blackText}>Game starts in...</h2>
      <div className="m-auto  align-middle">
        <h2 className={"text-6xl" + blackText}>
          {props.currentValue}
        </h2>
      </div>
    </div >
  )
}
