import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateGame } from "../../store/gameReducer"
import "./drive.css"

const Drive = () => {
    const gameObj = useSelector((state) => state.game)
    const dispatch = useDispatch()
    const [faceUpWhite, setFaceUpWhite] = useState("ball")
    const [faceUpBlue, setFaceUpBlue] = useState()
    const [faceUpGreen1, setFaceUpGreen1] = useState()
    const [faceUpGreen2, setFaceUpGreen2] = useState()
    const [faceUpGreen3, setFaceUpGreen3] = useState()
    const [canRoll, setCanRoll] = useState(true)
    const [rollButtonColor, setRollButtonColor] = useState("#c7f4c7")
    const [circle, setCircle] = useState("n/a")
    const [usedBlue, setUsedBlue] = useState(false)
    const [usedGreen1, setUsedGreen1] = useState(false)
    const [usedGreen2, setUsedGreen2] = useState(false)
    const [usedGreen3, setUsedGreen3] = useState(false)
    const [message, setMessage] = useState("")
    useEffect(() => {
        if (canRoll) {
            setRollButtonColor("#c7f4c7")
        } else {
            setRollButtonColor("#f5c7c7")
        }
    }, [canRoll])

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
    let blueDieSides = {
        "1": "TD",
        "2": -10,
        "3": 0,
        "4": 10,
        "5": 0,
        "6": 6,
        "7": 30,
        "8": 0,
        "9": 20,
        "10": 7,
        "11": 5,
        "12": 6,
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

    const handleRoll = () => {
        if (!canRoll) return
        setCanRoll(false)
        const roll = () => {
            const whiteResult = whiteDieSides[(Math.floor(Math.random() * (12 - 1 + 1) + 1))]
            const blueResult = blueDieSides[(Math.floor(Math.random() * (12 - 1 + 1) + 1))]
            const green1Result = greenDieSides[(Math.floor(Math.random() * (12 - 1 + 1) + 1))]
            const green2Result = greenDieSides[(Math.floor(Math.random() * (12 - 1 + 1) + 1))]
            const green3Result = greenDieSides[(Math.floor(Math.random() * (12 - 1 + 1) + 1))]
            setFaceUpWhite(whiteResult)
            if (!usedBlue) setFaceUpBlue(blueResult)
            if (!usedGreen1) setFaceUpGreen1(green1Result)
            if (!usedGreen2) setFaceUpGreen2(green2Result)
            if (!usedGreen3) setFaceUpGreen3(green3Result)
        }
        let interval = setInterval(roll, 200)
        setTimeout(() => finish(), 3000)

        const finish = () => {
            clearInterval(interval)
            let changes = {}

            if (faceUpWhite === "ball") {

            }
        }
    }

    useEffect(() => {

    }, [gameObj.ballOn, gameObj.toGo])

    const handlePlayBlue = () => {
        if (!faceUpBlue && faceUpBlue !== 0) return
        setUsedBlue(true)
        let changes = {}
        if (faceUpBlue === "TD") {
            let changes = {}
            if (gameObj.direction === "-->") {
                changes['teamOneScore'] = gameObj.teamOneScore + 6
                changes['ballOn'] = 100
            } else if (gameObj.direction === "<--") {
                changes['teamTwoScore'] = gameObj.teamTwoScore + 6
                changes['ballOn'] = 0
            }
        } else {
            if (gameObj.direction === "-->") {
                changes['ballOn'] = gameObj.ballOn + faceUpBlue
                changes['toGo'] = gameObj.toGo - faceUpBlue
            } else if (gameObj.direction === "<--") {
                changes['ballOn'] = gameObj.ballOn - faceUpBlue
                changes['toGo'] = gameObj.toGo - faceUpBlue
            }
        }
        changes['down'] = gameObj.down + 1
        setCanRoll(true)
        let payload = { ...gameObj, ...changes }
        dispatch(updateGame(payload))
    }

    const handlePlayGreen1 = () => {
        setUsedGreen1(true)
    }


    return (
        <div className="drive-wrapper">
            <div className="dice-wrapper">
                <div className="option-wrapper">
                    <div className="white-die">
                        {faceUpWhite === "ball" && <div className="white-die-ball"></div>}
                        {faceUpWhite === "flag" && <div className="white-die-flag"><i className="fa-solid fa-flag" /></div>}
                        {faceUpWhite === "sack" && <div className="white-die-sack"><i className="fa-solid fa-ban" /></div>}
                        {faceUpWhite === "turnover" && <div className="white-die-sack"><i className="fa-solid fa-asterisk" /></div>}
                    </div>
                    <button onClick={handleRoll} className="roll-button" style={{ backgroundColor: rollButtonColor }}>Roll</button>

                </div>
                <div className="option-wrapper">
                    <div className="blue-die"><div className="kick-die-text">{faceUpBlue}</div></div>
                    {!usedBlue && <button className="drive-button" onClick={handlePlayBlue}>Run Play</button>}
                </div>
                <div className="option-wrapper">
                    <div className="green-die"><div className="kick-die-text">{faceUpGreen1}</div></div>
                    <button className="drive-button">Run Play</button>
                </div>
                <div className="option-wrapper">
                    <div className="green-die"><div className="kick-die-text">{faceUpGreen2}</div></div>
                    <button className="drive-button">Run Play</button>
                </div>
                <div className="option-wrapper">
                    <div className="green-die"><div className="kick-die-text">{faceUpGreen3}</div></div>
                    <button className="drive-button">Run Play</button>
                </div>
            </div>
            <div className="punt-fg-wrapper">
                <button className="drive-button" style={{ backgroundColor: rollButtonColor }}>Punt</button>
                <button className="drive-button" style={{ backgroundColor: rollButtonColor }}>Field Goal</button>
            </div>
        </div>
    )
}

export default Drive
