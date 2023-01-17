import { useState } from "react"
import "./drive.css"

const Drive = () => {
    const [faceUpWhite, setFaceUpWhite] = useState("ball")
    const [faceUpBlue, setFaceUpBlue] = useState(10)
    const [faceUpGreen1, setFaceUpGreen1] = useState(-2)
    const [faceUpGreen2, setFaceUpGreen2] = useState(3)
    const [faceUpGreen3, setFaceUpGreen3] = useState(0)
    const [canRoll, setCanRoll] = useState(true)
    const [circle, setCircle] = useState("n/a")

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
        // setCanRoll(false)
        const roll = () => {
            const whiteResult = whiteDieSides[(Math.floor(Math.random() * (12 - 1 + 1) + 1))]
            const blueResult = blueDieSides[(Math.floor(Math.random() * (12 - 1 + 1) + 1))]
            const green1Result = greenDieSides[(Math.floor(Math.random() * (12 - 1 + 1) + 1))]
            const green2Result = greenDieSides[(Math.floor(Math.random() * (12 - 1 + 1) + 1))]
            const green3Result = greenDieSides[(Math.floor(Math.random() * (12 - 1 + 1) + 1))]
            setFaceUpWhite(whiteResult)
            setFaceUpBlue(blueResult)
            setFaceUpGreen1(green1Result)
            setFaceUpGreen2(green2Result)
            setFaceUpGreen3(green3Result)
        }
        let interval = setInterval(roll, 200)
        setTimeout(() => finish(), 3000)

        const finish = () => {
            clearInterval(interval)
        }
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
                    <button onClick={handleRoll} className="roll-button">Roll</button>

                </div>
                <div className="option-wrapper">
                    <div className="blue-die"><div className="kick-die-text">{faceUpBlue}</div></div>
                    <button className="drive-button">Run Play</button>
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
                <button className="drive-button">Punt</button>
                <button className="drive-button">Field Goal</button>
            </div>
        </div>
    )
}

export default Drive
