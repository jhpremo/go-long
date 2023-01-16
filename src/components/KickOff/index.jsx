
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateGame } from "../../store/gameReducer"
import "./kick-off.css"

const KickOff = () => {
    const dispatch = useDispatch()
    const gameObj = useSelector((state) => state.game)
    const [faceUp, setFaceUp] = useState("20")
    const [rolled, setRolled] = useState(false)
    const [ready, setReady] = useState("default")
    const [circle, setCircle] = useState("n/a")
    const [message, setMessage] = useState("")
    let kickDieSides = {
        "1": "X",
        "2": 20,
        "3": 60,
        "4": 45,
        "5": 10,
        "6": 30,
        "7": "TD",
        "8": 55,
        "9": 40,
        "10": 25,
        "11": 50,
        "12": 35,
    }
    const rollDie = () => {
        if (rolled) return
        // setRolled(true)
        let result
        const roll = () => {
            result = kickDieSides[(Math.floor(Math.random() * (12 - 1 + 1) + 1))]
            if (result === "X" || result === "TD") setCircle("circle")
            else setCircle("n/a")
            setFaceUp(result)
        }
        let interval = setInterval(roll, 200)
        setTimeout(() => finish(), 3000)

        const finish = () => {
            clearInterval(interval)
            let changes = {}
            if (result === "TD") {
                if (gameObj.direction === "-->") {
                    setMessage(`${gameObj.teamOneName} return the kick off for a touch down!!! click to continue`)
                    changes['teamOneScore'] = gameObj.teamOneScore + 6
                    changes['ballOn'] = 100
                } else if (gameObj.direction === "<--") {
                    setMessage(`${gameObj.teamTwoName} return the kick off for a touch down!!! click to continue`)
                    changes['teamTwoScore'] = gameObj.teamTwoScore + 6
                    changes['ballOn'] = 0
                }
            } else if (result === "X") {
                if (gameObj.direction === "-->") {
                    setMessage(`Touch back ${gameObj.teamOneName} starts at the 20 yard line, click to continue`)
                    changes['ballOn'] = 20
                    changes['toGo'] = 10
                } else {
                    setMessage(`Touch back ${gameObj.teamTwoName} starts at the 20 yard line, click to continue`)
                    changes['ballOn'] = 80
                    changes['toGo'] = 10
                }
                changes['down'] = 1
            } else {
                if (gameObj.direction === "-->") {
                    setMessage(`${gameObj.teamOneName} return the kick off ${result} yards!, click to continue`)
                    changes['ballOn'] = result
                    changes['toGo'] = 10
                } else {
                    setMessage(`${gameObj.teamTwoName} return the kick off ${result} yards!, click to continue`)
                    changes['ballOn'] = 100 - result
                    changes['toGo'] = 10
                }
                changes['down'] = 1
            }
            let payload = { ...gameObj, ...changes }
            dispatch(updateGame(payload))
            setReady("pointer")
        }
    }

    const handleReady = () => {
        if (ready === "pointer" && faceUp === "TD") {
            let payload = { ...gameObj, gameAction: "extra-point" }
            payload.down = "-"
            payload.toGo = "-"
            payload.ballOn = "-"
            dispatch(updateGame(payload))
        } else if (ready === "pointer") {
            let payload = { ...gameObj, gameAction: "drive" }
            dispatch(updateGame(payload))
        }
    }

    return (
        <div onClick={handleReady} className="kick-off-wrapper">
            {gameObj.direction === "-->" && <h2>{gameObj.teamOneName} will roll for kick return</h2>}
            {gameObj.direction === "<--" && <h2>{gameObj.teamTwoName} will roll for kick return</h2>}
            <div className="kick-die" onClick={rollDie}><div className="kick-die-text" id={circle}>{faceUp}</div></div>
            {<div className="message">{message}</div>}
        </div>
    )
}

export default KickOff
