import { useEffect, useRef, useState } from "react"
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
    const [faceUpWhite, setFaceUpWhite] = useState()
    const [faceUpGreen1, setFaceUpGreen1] = useState()
    const faceUpGreen1Ref = useRef()
    const [rollButtonColor, setRollButtonColor] = useState("#c7f4c7")

    let greenDieSides = {
        "1": 0,
        "2": 1,
        "3": 1,
        "4": 2,
        "5": 1,
        "6": 2,
        "7": 2,
        "8": 0,
        "9": 0,
        "10": 3,
        "11": -1,
        "12": -2,
    }
    let whiteDieSides = {
        "1": "ball",
        "2": "ball",
        "3": "ball",
        "4": "ball",
        "5": "ball",
        "6": "ball",
        "7": "ball",
        "8": "ball",
        "9": "ball",
        "10": "flag",
        "11": "sack",
        "12": "turnover",
    }

    useEffect(() => {
        if (!rolled) {
            setRollButtonColor("#c7f4c7")
        } else {
            setRollButtonColor("#f5c7c7")
        }
    }, [rolled])


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
        setTimeout(() => finish(interval, result), 3000)

    }
    const finish = (interval, faceUp) => {
        clearInterval(interval)
        console.log(faceUp)
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

    const rollForTwo = () => {
        if (rolled) return
        setRolled(true)
        let whiteResult, greenResult
        const rollTwo = () => {
            whiteResult = whiteDieSides[(Math.floor(Math.random() * (12 - 1 + 1) + 1))]
            greenResult = greenDieSides[(Math.floor(Math.random() * (12 - 1 + 1) + 1))]
            setFaceUpGreen1(greenResult)
            faceUpGreen1Ref.current = greenResult
            setFaceUpWhite(whiteResult)
        }

        let interval = setInterval(rollTwo, 200)
        setTimeout(() => finishTwo(interval, whiteResult, greenResult), 3000)

    }
    const finishTwo = (interval, faceUpWhite, faceUpGreen1) => {
        clearInterval(interval)
        let changes = {}
        if (faceUpWhite === "ball" && (faceUpGreen1 >= 2)) {
            if (gameObj.direction === "-->") {
                setMessage(`${gameObj.teamOneName} converts the two point try! click to continue`)
                changes['teamOneScore'] = gameObj.teamOneScore + 2
            } else {
                setMessage(`${gameObj.teamTwoName} converts the two point try! click to continue`)
                changes['teamTwoScore'] = gameObj.teamTwoScore + 2
            }
        } else {
            if (gameObj.direction === "-->") {
                setMessage(`${gameObj.teamOneName} fail to convert click to continue`)
            } else {
                setMessage(`${gameObj.teamTwoName} fail to convert click to continue`)
            }
        }
        let payload = { ...gameObj, ...changes }
        dispatch(updateGame(payload))
        setReady("pointer")
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
                    <button onClick={() => setToggleTwo(true)} className="post-td-button">Go for two</button>
                </div></>}
            {togglePAT && <>
                {!rolled && <button onClick={() => setTogglePAT(false)} className="back-button"><i className="fa-solid fa-arrow-left" /></button>}
                {gameObj.direction === "-->" && <h2> {gameObj.teamOneName} Extra Point</h2>}
                {gameObj.direction === "<--" && <h2> {gameObj.teamTwoName} Extra Point</h2>}
                <h3>A X on the kicking die is a failure anything else is a success</h3>
                <div className="two-point-dice-wrapper">
                    <div className="option-wrapper">
                        <button onClick={rollDie} className="roll-button" style={{ backgroundColor: rollButtonColor }}>Roll</button>
                    </div>
                    <div className="kick-die" ><div className="kick-die-text" id={circle}>{faceUp}</div></div>
                </div>
                {<div className="message">{message}</div>}
            </>}
            {toggleTwo && <>
                {!rolled && <button onClick={() => setToggleTwo(false)} className="back-button"><i className="fa-solid fa-arrow-left" /></button>}
                {gameObj.direction === "-->" && <h2> {gameObj.teamOneName} Two Point Try</h2>}
                {gameObj.direction === "<--" && <h2> {gameObj.teamTwoName} Two Point Try</h2>}
                <h3>A football on white with a 2 or 3 on green is a success</h3>
                <div className="two-point-dice-wrapper">
                    <div className="option-wrapper">
                        <button onClick={rollForTwo} className="roll-button" style={{ backgroundColor: rollButtonColor }}>Roll</button>
                    </div>
                    <div className="option-wrapper">
                        <div className="white-die">
                            {faceUpWhite === "ball" && <div className="white-die-ball"></div>}
                            {faceUpWhite === "flag" && <div className="white-die-flag"><i className="fa-solid fa-flag" /></div>}
                            {faceUpWhite === "sack" && <div className="white-die-sack"><i className="fa-solid fa-ban" /></div>}
                            {faceUpWhite === "turnover" && <div className="white-die-sack"><i className="fa-solid fa-asterisk" /></div>}
                        </div>
                    </div>
                    <div className="option-wrapper">
                        <div className="green-die"><div className="kick-die-text">{faceUpGreen1}</div></div>

                    </div>
                </div>
                {<div className="post-td-message">{message}</div>}
            </>}
        </div>
    )
}

export default PostTouchdown
