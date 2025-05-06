import { blackText } from "./ViewUtils"

export function ErrorView(props: any) {
    return (
        <div className="relative top-1/2 left-0 w-full flex flex-col justify-center items-center m-5">
            <div className="relative flex flex-col items-center">
                <span className={blackText + "text-2xl"}>Chosen playlist is invalid</span>
                <span className={blackText}>Please return and choose another playlist</span>
            </div>
            <div className="mt-4">
                <button onClick={onReturnToMenuACB}>Return</button>
            </div>
        </div>
    )
    function onReturnToMenuACB() {
        props.returnToMenu()
    }
}