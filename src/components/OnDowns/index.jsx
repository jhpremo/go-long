import { useDispatch, useSelector } from "react-redux"
import nextDrive from "../../nextDrive"
import { updateGame } from "../../store/gameReducer"
import "./on-downs.css"

const OnDowns = () => {
    const dispatch = useDispatch()
    const gameObj = useSelector((state) => state.game)

    const handleClick = () => {
        let changes = {}
        changes.toGo = 10
        changes.down = 1
        changes.gameAction = "drive"
        if (gameObj.direction === "-->") {
            changes.direction = "<--"
            if (gameObj.ballOn <= 10) changes.toGo = "-"
        }
        else {
            changes.direction = "-->"
            if (gameObj.ballOn >= 90) changes.toGo = "-"
        }
        let driveChanges = nextDrive(gameObj)
        let payload = { ...gameObj, ...changes, ...driveChanges }
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
