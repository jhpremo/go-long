import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateGame } from "../../store/gameReducer"
import "./post-touchdown.css"

const PostTouchdown = () => {
    const dispatch = useDispatch()
    const gameObj = useSelector((state) => state.game)
    const [togglePAT, setTogglePAT] = useState(false)
    const [toggleTwo, setToggleTwo] = useState(false)
    const [rolled, setRolled] = useState(false)
    const [ready, setReady] = useState("default")
    const [circle, setCircle] = useState("n/a")
    const [message, setMessage] = useState("")
    const [faceUp, setFaceUp] = useState("20")

    let kickDieSides = {
        "1": "X",
        "2": 20,
        "3": 60,
        "4": 45,
        "5": 10,
        "6": 30,
        "7": "FG",
        "8": 55,
        "9": 40,
        "10": 25,
        "11": 50,
        "12": 35,
    }
    const rollDie = () => {
        if (rolled) return
        setRolled(true)
        let result
        const roll = () => {
            result = kickDieSides[(Math.floor(Math.random() * (12 - 1 + 1) + 1))]
            if (result === "X" || result === "FG") setCircle("circle")
            else setCircle("n/a")
            setFaceUp(result)
        }
        let interval = setInterval(roll, 200)
        setTimeout(() => finish(), 3000)

        const finish = () => {
            clearInterval(interval)
            let changes = {}
            if (faceUp === "X") {
                if (gameObj.direction === "-->") {
                    setMessage(`${gameObj.teamOneName} misses the extra point click to continue`)
                } else {
                    setMessage(`${gameObj.teamTwoName} misses the extra point click to continue`)
                }
            } else {
                if (gameObj.direction === "-->") {
                    setMessage(`${gameObj.teamOneName} makes the extra point! click to continue`)
                    changes['teamOneScore'] = gameObj.teamOneScore + 1
                } else {
                    setMessage(`${gameObj.teamTwoName} makes the extra point! click to continue`)
                    changes['teamTwoScore'] = gameObj.teamTwoScore + 1
                }
            }
            let payload = { ...gameObj, ...changes }
            dispatch(updateGame(payload))
            setReady("pointer")
        }
    }

    const handleReady = () => {
        if (ready === "pointer") {
            let changes = {}
            changes.gameAction = "kick-off"
            if (gameObj.direction === "-->") changes.direction = "<--"
            else if (gameObj.direction === "<--") changes.direction = "-->"
            changes.down = "-"
            changes.toGo = "-"
            changes.ballOn = "-"
            let payload = { ...gameObj, ...changes }
            dispatch(updateGame(payload))
        }
    }

    return (
        <div onClick={handleReady} style={{ cursor: ready }} className="post-touchdown-wrapper">
            {(!togglePAT && !toggleTwo) && <>{gameObj.direction === "-->" && <h2>Touchdown {gameObj.teamOneName}!</h2>}
                {gameObj.direction === "<--" && <h2>Touchdown {gameObj.teamTwoName}!</h2>}
                <div className="post-touchdown-button-wrapper">
                    <button onClick={() => setTogglePAT(true)} className="post-td-button">Extra Point</button>
                    <button className="post-td-button">Go for two</button>
                </div></>}
            {togglePAT && <>
                {!rolled && <button onClick={() => setTogglePAT(false)} className="back-button"><i className="fa-solid fa-arrow-left" /></button>}
                {gameObj.direction === "-->" && <h2> {gameObj.teamOneName} Extra Point</h2>}
                {gameObj.direction === "<--" && <h2> {gameObj.teamTwoName} Extra Point</h2>}
                <h3>A X on the kicking die is a failure anything else is a success</h3>
                <div className="kick-die" onClick={rollDie}><div className="kick-die-text" id={circle}>{faceUp}</div></div>
                {<div className="message">{message}</div>}
            </>}
        </div>
    )
}

export default PostTouchdown
