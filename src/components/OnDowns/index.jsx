import { useDispatch, useSelector } from "react-redux"
import { updateGame } from "../../store/gameReducer"
import "./on-downs.css"

const OnDowns = () => {
    const dispatch = useDispatch()
    const gameObj = useSelector((state) => state.game)

    const handleClick = () => {
        let changes = {}
        changes.toGo = 10
        changes.down = 1
        changes.drive = gameObj.drive + 1
        changes.gameAction = "drive"
        if (gameObj.direction === "-->") changes.direction = "<--"
        else changes.direction = "-->"

        let payload = { ...gameObj, ...changes }
        dispatch(updateGame(payload))
    }
    return (
        <div className="on-downs-wrapper" onClick={handleClick}>
            {gameObj.direction === "-->" && <h2>{gameObj.teamOneName} have turned the ball over on downs</h2>}
            {gameObj.direction === "<--" && <h2>{gameObj.teamTwoName} have turned the ball over on downs</h2>}
            <h4>click to continue</h4>
        </div>
    )
}


export default OnDowns
