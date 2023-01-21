import { useDispatch, useSelector } from "react-redux"
import { updateGame } from "../../store/gameReducer"

const PostSaftey = () => {
    const dispatch = useDispatch()
    const gameObj = useSelector((state) => state.game)

    const handleClick = () => {
        let changes = {}
        changes.toGo = "-"
        changes.down = "-"
        changes.gameAction = "punt"
        if (gameObj.direction === "-->") {
            changes.ballOn = 20
            changes.teamTwoScore = gameObj.teamTwoScore + 2
        } else {
            changes.ballOn = 80
            changes.teamOneScore = gameObj.teamOneScore + 2
        }

        let payload = { ...gameObj, ...changes }
        dispatch(updateGame(payload))
    }
    return (
        <div className="on-downs-wrapper" onClick={handleClick}>
            {gameObj.direction === "-->" && <h2>{gameObj.teamTwoName} have forced a Saftey</h2>}
            {gameObj.direction === "<--" && <h2>{gameObj.teamOneName} have forced a Saftey</h2>}
            <h4>click to continue</h4>
        </div>
    )
}


export default PostSaftey
