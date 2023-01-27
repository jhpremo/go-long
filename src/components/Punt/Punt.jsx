import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import nextDrive from "../../nextDrive"
import { updateGame } from "../../store/gameReducer"


const Punt = () => {
    const dispatch = useDispatch()
    const gameObj = useSelector((state) => state.game)
    const [faceUp, setFaceUp] = useState("20")
    const [rolled, setRolled] = useState(false)
    const [ready, setReady] = useState("default")
    const [circle, setCircle] = useState("n/a")
    const [message, setMessage] = useState("")
    const [rollButtonColor, setRollButtonColor] = useState("#c7f4c7")
    const [nextAction, setNextAction] = useState()

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
        "7": "TB",
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
            if (result === "X" || result === "TB") setCircle("circle")
            else setCircle("n/a")
            setFaceUp(result)
        }
        let interval = setInterval(roll, 200)
        setTimeout(() => finish(), 3000)

        const finish = () => {
            clearInterval(interval)
            let changes = {}
            if (result === "X") {
                setMessage(`Punt is blocked! defense take over at line of scrimmage`)
            } else if (result === "TB") {
                setMessage("Touchback, drive will start on the 20")
                if (gameObj.direction === "-->") {
                    changes.ballOn = 80
                } else {
                    changes.ballOn = 20
                }
            } else {
                if (gameObj.direction === "-->") {
                    if (result >= (100 - gameObj.ballOn)) {
                        setMessage("Touchback, drive will start on the 20")
                        changes.ballOn = 80
                    } else {
                        setMessage(`${result} yard punt!`)
                        changes.ballOn = gameObj.ballOn + result
                    }
                } else {
                    if (result >= gameObj.ballOn) {
                        setMessage("Touchback, drive will start on the 20")
                        changes.ballOn = 20
                    } else {
                        setMessage(`${result} yard punt!`)
                        changes.ballOn = gameObj.ballOn - result
                    }
                }
            }
            changes['down'] = 1
            changes['toGo'] = "-"
            let payload = { ...gameObj, ...changes }
            dispatch(updateGame(payload))
            setReady("pointer")
        }
    }

    const handleReady = () => {
        if (ready === "pointer") {
            let payload = { ...gameObj, gameAction: "drive", toGo: 10 }
            if (gameObj.direction === "-->") payload.direction = "<--"
            else payload.direction = "-->"
            let driveChanges = nextDrive(gameObj)
            dispatch(updateGame({ ...payload, ...driveChanges }))
        }
    }
    return (
        <div onClick={handleReady} className="kick-off-wrapper" style={{ cursor: ready }}>
            {gameObj.direction === "-->" && <h2>{gameObj.teamOneName} Punt</h2>}
            {gameObj.direction === "<--" && <h2>{gameObj.teamTwoName} Punt</h2>}
            <div className="two-point-dice-wrapper">
                <div className="option-wrapper">
                    <button onClick={rollDie} className="roll-button" style={{ backgroundColor: rollButtonColor }}>Roll</button>
                </div>
                <div className="kick-die" onClick={rollDie}><div className="kick-die-text" id={circle}>{faceUp}</div></div>
            </div>
            {!!message.length && <div className="message">{message} click to continue</div>}
        </div>
    )
}

export default Punt
