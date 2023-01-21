import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateGame } from "../../store/gameReducer"
import "./drive.css"

const Drive = () => {
    const gameObj = useSelector((state) => state.game)
    const dispatch = useDispatch()
    const [faceUpWhite, setFaceUpWhite] = useState("ball")
    const [faceUpRed, setFaceUpRed] = useState()
    const [faceUpYellow, setFaceUpYellow] = useState()
    const [faceUpBlue, setFaceUpBlue] = useState()
    const [faceUpGreen1, setFaceUpGreen1] = useState()
    const [faceUpGreen2, setFaceUpGreen2] = useState()
    const [faceUpGreen3, setFaceUpGreen3] = useState()
    const [canRoll, setCanRoll] = useState(true)
    const [rollButtonColor, setRollButtonColor] = useState("#c7f4c7")
    const [usedBlue, setUsedBlue] = useState(false)
    const [usedGreen1, setUsedGreen1] = useState(false)
    const [usedGreen2, setUsedGreen2] = useState(false)
    const [usedGreen3, setUsedGreen3] = useState(false)
    const [showFlag, setShowFlag] = useState(false)
    const [flagRolled, setFlagRolled] = useState(false)
    const [flagMessage, setFlagMessage] = useState()
    const [showSack, setShowSack] = useState(false)
    const [sackRolled, setSackRolled] = useState(false)
    const [sackMessage, setSackMessage] = useState()
    const [showTurnover, setShowTurnover] = useState(false)
    const [turnoverRolled, setTurnoverRolled] = useState(false)
    const [turnoverMessage, setTurnoverMessage] = useState()
    const [showPick6, setShowPick6] = useState(false)
    const [showTurnoverScreen2, setTurnoverSceen2] = useState(false)
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
    const redDieSides = {
        "1": "O",
        "2": "D"
    }
    let yellowDieSides = {
        "1": "offset",
        "2": 5,
        "3": 10,
        "4": 15,
        "5": 5,
        "6": 10,
        "7": "PI",
        "8": 5,
        "9": 5,
        "10": 15,
        "11": 5,
        "12": 10,
    }

    const resetFirstDown = () => {
        setFaceUpBlue()
        setFaceUpGreen1()
        setFaceUpGreen2()
        setFaceUpGreen3()
        setUsedBlue(false)
        setUsedGreen1(false)
        setUsedGreen2(false)
        setUsedGreen3(false)
    }
    const resetFlag = () => {
        setShowFlag(false)
        setFlagRolled(false)
        setFaceUpRed()
        setFaceUpYellow()
        setShowTurnover(false)
        setTurnoverSceen2(false)
        setTurnoverMessage()
        setFlagMessage()
    }
    const handleRoll = () => {
        if (!canRoll) return
        resetFlag()
        setSackRolled(false)
        setSackMessage()
        setCanRoll(false)
        let whiteResult, blueResult, green1Result, green2Result, green3Result
        const roll = () => {
            whiteResult = whiteDieSides[(Math.floor(Math.random() * (12 - 1 + 1) + 1))]
            blueResult = blueDieSides[(Math.floor(Math.random() * (12 - 1 + 1) + 1))]
            green1Result = greenDieSides[(Math.floor(Math.random() * (12 - 1 + 1) + 1))]
            green2Result = greenDieSides[(Math.floor(Math.random() * (12 - 1 + 1) + 1))]
            green3Result = greenDieSides[(Math.floor(Math.random() * (12 - 1 + 1) + 1))]
            setFaceUpWhite(whiteResult)
            if (!usedBlue) setFaceUpBlue(blueResult)
            if (!usedGreen1) setFaceUpGreen1(green1Result)
            if (!usedGreen2) setFaceUpGreen2(green2Result)
            if (!usedGreen3) setFaceUpGreen3(green3Result)
        }
        let interval = setInterval(roll, 200)
        setTimeout(() => finish(interval), 3000)

        const finish = (interval) => {
            clearInterval(interval)
            setShowSack(true)
            // if (whiteResult === "flag") {
            //     setShowFlag(true)
            // } else if (whiteResult === "sack") {
            //     setShowSack(true)
            // } else if (whiteResult === "turnover") {
            //     if (blueResult === "TD") {
            //         setUsedBlue(true)
            //         setShowPick6(true)
            //     } else {
            //         setShowTurnover(true)
            //     }
            // }
        }
    }

    useEffect(() => {
        let changes = {}
        if (gameObj.toGo <= 0) {
            if ((gameObj.ballOn >= 90 && gameObj.direction === "-->") || (gameObj.ballOn <= 10 && gameObj.direction === "<--")) {
                changes.toGo = "-"
            } else {
                changes.toGo = 10
            }
            changes.down = 1
            resetFirstDown()
        }
        if (gameObj.ballOn <= 0) {
            if (gameObj.direction === "<--") {
                changes['teamTwoScore'] = gameObj.teamTwoScore + 6
                changes.ballOn = 0
                changes.gameAction = "post-touchdown"
            } else {
                changes.ballOn = 0
                changes.gameAction = "post-saftey"
            }
            changes.toGo = "-"
            changes.down = "-"
        } else if (gameObj.ballOn >= 100) {
            if (gameObj.direction === "-->") {
                changes['teamOneScore'] = gameObj.teamTwoScore + 6
                changes.ballOn = 100
                changes.gameAction = "post-touchdown"
            } else {
                changes.ballOn = 100
                changes.gameAction = "post-saftey"
            }
            changes.toGo = "-"
            changes.down = "-"
        } else if (gameObj.down === 4 && usedBlue && usedGreen1 && usedGreen2 && usedGreen3 && !changes.down) {
            changes.gameAction = "post-turnover-on-downs"
        }
        let payload = { ...gameObj, ...changes }
        dispatch(updateGame(payload))
    }, [gameObj.ballOn, gameObj.toGo, gameObj.down, usedBlue, usedGreen1, usedGreen2, usedGreen3])

    const handlePlayBlue = () => {
        if (!faceUpBlue && faceUpBlue !== 0) return
        setUsedBlue(true)
        let changes = {}
        if (faceUpBlue === "TD") {
            if (gameObj.direction === "-->") {
                changes['ballOn'] = 100
            } else if (gameObj.direction === "<--") {
                changes['ballOn'] = 0
            }
        } else {
            if (gameObj.direction === "-->") {
                changes['ballOn'] = gameObj.ballOn + faceUpBlue
                if (gameObj.toGo !== "-") changes['toGo'] = gameObj.toGo - faceUpBlue
            } else if (gameObj.direction === "<--") {
                changes['ballOn'] = gameObj.ballOn - faceUpBlue
                if (gameObj.toGo !== "-") changes['toGo'] = gameObj.toGo - faceUpBlue
            }
        }
        if (gameObj.down < 4) changes['down'] = gameObj.down + 1
        setCanRoll(true)
        let payload = { ...gameObj, ...changes }
        dispatch(updateGame(payload))
    }

    const handlePlayGreen1 = () => {
        if (!faceUpGreen1 && faceUpGreen1 !== 0) return
        setUsedGreen1(true)
        let changes = {}

        if (gameObj.direction === "-->") {
            changes['ballOn'] = gameObj.ballOn + faceUpGreen1
            if (gameObj.toGo !== "-") changes['toGo'] = gameObj.toGo - faceUpGreen1
        } else if (gameObj.direction === "<--") {
            changes['ballOn'] = gameObj.ballOn - faceUpGreen1
            if (gameObj.toGo !== "-") changes['toGo'] = gameObj.toGo - faceUpGreen1
        }

        if (gameObj.down < 4) changes['down'] = gameObj.down + 1
        setCanRoll(true)
        let payload = { ...gameObj, ...changes }
        dispatch(updateGame(payload))
    }

    const handlePlayGreen2 = () => {
        if (!faceUpGreen2 && faceUpGreen2 !== 0) return
        setUsedGreen2(true)
        let changes = {}

        if (gameObj.direction === "-->") {
            changes['ballOn'] = gameObj.ballOn + faceUpGreen2
            if (gameObj.toGo !== "-") changes['toGo'] = gameObj.toGo - faceUpGreen2
        } else if (gameObj.direction === "<--") {
            changes['ballOn'] = gameObj.ballOn - faceUpGreen2
            if (gameObj.toGo !== "-") changes['toGo'] = gameObj.toGo - faceUpGreen2
        }

        if (gameObj.down < 4) changes['down'] = gameObj.down + 1
        setCanRoll(true)
        let payload = { ...gameObj, ...changes }
        dispatch(updateGame(payload))
    }

    const handlePlayGreen3 = () => {
        if (!faceUpGreen3 && faceUpGreen3 !== 0) return
        setUsedGreen3(true)
        let changes = {}

        if (gameObj.direction === "-->") {
            changes['ballOn'] = gameObj.ballOn + faceUpGreen3
            if (gameObj.toGo !== "-") changes['toGo'] = gameObj.toGo - faceUpGreen3
        } else if (gameObj.direction === "<--") {
            changes['ballOn'] = gameObj.ballOn - faceUpGreen3
            if (gameObj.toGo !== "-") changes['toGo'] = gameObj.toGo - faceUpGreen3
        }

        if (gameObj.down < 4) changes['down'] = gameObj.down + 1
        setCanRoll(true)
        let payload = { ...gameObj, ...changes }
        dispatch(updateGame(payload))
    }

    const handleFlagRoll = () => {
        setFlagRolled(true)
        let redResult, yellowResult
        const roll = () => {
            yellowResult = yellowDieSides[(Math.floor(Math.random() * (12 - 1 + 1) + 1))]
            redResult = redDieSides[(Math.floor(Math.random() * (2) + 1))]
            setFaceUpRed(redResult)
            setFaceUpYellow(yellowResult)
        }

        let interval = setInterval(roll, 200)
        setTimeout(() => finish(interval), 3000)

        const finish = (interval) => {
            clearInterval(interval)
            let changes = {}
            if (redResult === "O") {
                if (yellowResult === "PI") {
                    setFlagMessage("Pass Interferance on the Offense 10 yard penalty")
                    if (gameObj.direction === "<--") {
                        changes.ballOn = gameObj.ballOn + 10
                    } else {
                        changes.ballOn = gameObj.ballOn - 10
                    }
                    changes.toGo = gameObj.toGo + 10
                } else if (yellowResult === "offset") {
                    setFlagMessage("Offsetting penalties replay the down")
                } else {
                    setFlagMessage(`${yellowResult} yard penalty on the offense`)
                    if (gameObj.direction === "<--") {
                        changes.ballOn = gameObj.ballOn + yellowResult
                    } else {
                        changes.ballOn = gameObj.ballOn - yellowResult
                    }
                    changes.toGo = gameObj.toGo + yellowResult
                }
            } else {
                if (yellowResult === "PI") {
                    let PI = 10
                    if (faceUpBlue !== "TD" && faceUpBlue > PI && !usedBlue) PI = faceUpBlue
                    setFlagMessage(`Pass interferance on the defense ${PI} yard penalty, first down`)
                    if (gameObj.direction === "<--") {
                        changes.ballOn = gameObj.ballOn - PI
                    } else {
                        changes.ballOn = gameObj.ballOn + PI
                    }
                    changes.toGo = gameObj.toGo - PI
                    changes.down = 1
                    resetFirstDown()
                } else if (yellowResult === "offset") {
                    setFlagMessage("Offsetting penalties replay the down")
                } else {
                    setFlagMessage(`${yellowResult} yard penalty on the defense`)
                    if (gameObj.direction === "<--") {
                        changes.ballOn = gameObj.ballOn - yellowResult
                    } else {
                        changes.ballOn = gameObj.ballOn + yellowResult
                    }
                    changes.toGo = gameObj.toGo - yellowResult
                }
            }
            if (changes.ballOn >= 100) {
                let diff = changes.ballOn - 100
                if (changes.toGo) changes.toGo -= diff
                changes.ballOn = 99
            }

            if (changes.ballOn <= 0) {
                let diff = 1 - changes.ballOn
                if (changes.toGo) changes.toGo -= diff
                changes.ballOn = 1
            }
            let payload = { ...gameObj, ...changes }
            dispatch(updateGame(payload))
            setCanRoll(true)
        }
    }

    const handleSackRoll = () => {
        setSackRolled(true)
        let yellowResult
        const rollSack = () => {
            yellowResult = yellowDieSides[(Math.floor(Math.random() * (12 - 1 + 1) + 1))]
            if (yellowResult === "PI") yellowResult = 10
            if (yellowResult === "offset") yellowResult = 0
            setFaceUpYellow(yellowResult)
        }

        let interval = setInterval(rollSack, 200)
        setTimeout(() => finish(interval), 3000)

        const finish = (interval) => {
            clearInterval(interval)
            if (!usedBlue) setFaceUpBlue(-yellowResult)
            if (!usedGreen1) setFaceUpGreen1(-yellowResult)
            if (!usedGreen2) setFaceUpGreen2(-yellowResult)
            if (!usedGreen3) setFaceUpGreen3(-yellowResult)
            setSackMessage(`Sacked for a loss of ${yellowResult} yards`)
        }
    }

    const handlePick6 = () => {
        let changes = {}
        if (gameObj.direction === "<--") {
            changes.direction = "-->"
            changes.ballOn = 100
        } else {
            changes.direction = "<--"
            changes.ballOn = 0
        }
        let payload = { ...gameObj, ...changes }
        dispatch(updateGame(payload))
    }

    const handleTurnoverRoll = () => {
        setTurnoverRolled(true)
        let redResult
        const roll = () => {
            redResult = redDieSides[(Math.floor(Math.random() * (2) + 1))]
            setFaceUpRed(redResult)
        }

        let interval = setInterval(roll, 200)
        setTimeout(() => finish(interval), 3000)

        const finish = (interval) => {
            clearInterval(interval)
            if (redResult === "O") {
                setTurnoverMessage("The offense has recovered the ball")
            } else {
                setTurnoverMessage("The defense has recovered the ball")
            }
        }
    }

    const handleTOSelection = (val) => {
        let changes = {}
        console.log(val)
        if (gameObj.direction === "-->") {
            changes.ballOn = gameObj.ballOn - val
            changes.direction = "<--"
        } else {
            changes.ballOn = gameObj.ballOn + val
            changes.direction = "-->"
        }
        changes.down = 1
        changes.toGo = 10
        changes.drive = gameObj.drive + 1
        console.log(changes)
        let payload = { ...gameObj, ...changes }
        dispatch(updateGame(payload))
        setShowTurnover(false)
        setTurnoverSceen2(false)
        setTurnoverMessage()
        resetFirstDown()
        setCanRoll(true)
    }
    return (
        <div className="drive-wrapper">
            {gameObj.direction === "-->" && <h2 className="drive-header">{gameObj.teamOneName} Drive</h2>}
            {gameObj.direction === "<--" && <h2 className="drive-header">{gameObj.teamTwoName} Drive</h2>}
            <div className="dice-wrapper">
                {showFlag && <div className="flag-wrapper">
                    <h3>Flag on the play, roll for penalized team and yardage</h3>
                    <div className="dice-wrapper" id="flag-dice-wrapper">
                        {!flagRolled && <div className="option-wrapper">
                            <button onClick={handleFlagRoll} className="roll-flag">Roll Flag</button>
                        </div>}
                        {flagRolled && <div className="option-wrapper">
                            <button className="roll-flag" style={{ backgroundColor: "#f5c7c7" }}>Roll Flag</button>
                        </div>}
                        <div className="option-wrapper" id="flag-die">
                            <div className="red-die"><div className="kick-die-text">{faceUpRed}</div></div>
                        </div>
                        <div className="option-wrapper" id="flag-die">
                            <div className="yellow-die">
                                {faceUpYellow === "offset" && <div className="yellow-die-icons"><i className="fa-solid fa-arrows-left-right" /></div>}
                                {faceUpYellow === "PI" && <div className="yellow-die-icons"><i className="fa-solid fa-hand" /></div>}
                                {faceUpYellow !== "offset" && faceUpYellow !== "PI" && <div className="kick-die-text">{faceUpYellow}</div>}
                            </div>
                        </div>
                    </div>
                    {!!flagMessage && <div className="post-td-message">{flagMessage}, roll to continue</div>}
                </div>}
                {showSack && <div className="flag-wrapper">
                    <h3>The QB has been sacked! Roll for yards lost</h3>
                    <div className="dice-wrapper" id="flag-dice-wrapper">
                        {!sackRolled && <div className="option-wrapper">
                            <button onClick={handleSackRoll} className="roll-flag">Roll Sack</button>
                        </div>}
                        {sackRolled && <div className="option-wrapper">
                            <button className="roll-flag" style={{ backgroundColor: "#f5c7c7" }}>Roll Sack</button>
                        </div>}
                        <div className="option-wrapper" id="flag-die">
                            <div className="yellow-die">
                                <div className="kick-die-text">{faceUpYellow}</div>
                            </div>
                        </div>
                    </div>
                    {!!sackMessage && <div className="post-td-message">{sackMessage} <button onClick={() => setShowSack(false)} className="drive-button">continue</button></div>}
                </div>}
                {showPick6 && <div className="pick6-wrapper">
                    <h3>Pick Six!</h3>
                    <button className="drive-button" onClick={handlePick6} >continue</button>
                </div>}
                {showTurnover && <div className="flag-wrapper">
                    {!showTurnoverScreen2 && <><h3>Potential turnover! Roll for possession</h3>
                        <div className="dice-wrapper" id="flag-dice-wrapper">
                            {!turnoverRolled && <div className="option-wrapper">
                                <button onClick={handleTurnoverRoll} className="roll-flag">Roll TO</button>
                            </div>}
                            {turnoverRolled && <div className="option-wrapper">
                                <button className="roll-flag" style={{ backgroundColor: "#f5c7c7" }}>Roll TO</button>
                            </div>}
                            <div className="option-wrapper" id="flag-die">
                                <div className="red-die"><div className="kick-die-text">{faceUpRed}</div></div>
                            </div>
                        </div>
                        {!!turnoverMessage && <div className="post-td-message">{turnoverMessage} <button className="drive-button" onClick={() => {
                            setTurnoverRolled(false)
                            if (faceUpRed === "O") {
                                setShowTurnover(false)
                            } else setTurnoverSceen2(true)
                        }} >continue</button></div>}</>}
                    {showTurnoverScreen2 && <>
                        <h3>Defense select one play die</h3>
                        <div className="dice-wrapper">
                            {!usedBlue && <div className="option-wrapper">
                                <div className="blue-die"><div className="kick-die-text">{faceUpBlue}</div></div>
                                <button className="drive-button" onClick={() => { handleTOSelection(faceUpBlue) }}>Select</button>
                            </div>}
                            {!usedGreen1 && <div className="option-wrapper">
                                <div className="green-die"><div className="kick-die-text">{faceUpGreen1}</div></div>
                                <button onClick={() => { handleTOSelection(faceUpGreen1) }} className="drive-button">Select</button>
                            </div>}
                            {!usedGreen2 && <div className="option-wrapper">
                                <div className="green-die"><div className="kick-die-text">{faceUpGreen2}</div></div>
                                <button onClick={() => { handleTOSelection(faceUpGreen2) }} className="drive-button">Select</button>
                            </div>}
                            {!usedGreen3 && <div className="option-wrapper">
                                <div className="green-die"><div className="kick-die-text">{faceUpGreen3}</div></div>
                                <button onClick={() => { handleTOSelection(faceUpGreen3) }} className="drive-button">Select</button>
                            </div>}
                        </div>
                    </>}
                </div>}
                <div className="option-wrapper">
                    <div className="white-die">
                        {faceUpWhite === "ball" && <div className="white-die-ball"></div>}
                        {faceUpWhite === "flag" && <div className="white-die-flag"><i className="fa-solid fa-flag" /></div>}
                        {faceUpWhite === "sack" && <div className="white-die-sack"><i className="fa-solid fa-ban" /></div>}
                        {faceUpWhite === "turnover" && <div className="white-die-sack"><i className="fa-solid fa-asterisk" /></div>}
                    </div>
                    {<button onClick={handleRoll} className="roll-button" style={{ backgroundColor: rollButtonColor }}>Roll</button>}

                </div>
                <div className="option-wrapper">
                    <div className="blue-die"><div className="kick-die-text">{faceUpBlue}</div></div>
                    {!usedBlue && <button className="drive-button" onClick={handlePlayBlue}>Run Play</button>}
                </div>
                <div className="option-wrapper">
                    <div className="green-die"><div className="kick-die-text">{faceUpGreen1}</div></div>
                    {!usedGreen1 && <button onClick={handlePlayGreen1} className="drive-button">Run Play</button>}
                </div>
                <div className="option-wrapper">
                    <div className="green-die"><div className="kick-die-text">{faceUpGreen2}</div></div>
                    {!usedGreen2 && <button onClick={handlePlayGreen2} className="drive-button">Run Play</button>}
                </div>
                <div className="option-wrapper">
                    <div className="green-die"><div className="kick-die-text">{faceUpGreen3}</div></div>
                    {!usedGreen3 && <button onClick={handlePlayGreen3} className="drive-button">Run Play</button>}
                </div>
            </div>
            <div className="punt-fg-wrapper">
                <button onClick={() => {
                    let payload = { ...gameObj }
                    payload.gameAction = "punt"
                    dispatch(updateGame(payload))
                }} className="drive-button" style={{ backgroundColor: rollButtonColor }}>Punt</button>
                <button onClick={() => {
                    let payload = { ...gameObj }
                    payload.gameAction = "field-goal"
                    dispatch(updateGame(payload))
                }} className="drive-button" style={{ backgroundColor: rollButtonColor }}>Field Goal</button>
            </div>
        </div >
    )
}

export default Drive
