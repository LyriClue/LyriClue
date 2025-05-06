export function ErrorView(props: any) {
    return (
        <div>
            <span>Chosen playlist is invalid </span>
            <button onClick={onReturnToMenuACB}>Return</button>
        </div>
    )
    function onReturnToMenuACB() {
        props.returnToMenu()
    }
}