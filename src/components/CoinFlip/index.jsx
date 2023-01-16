import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateGame } from "../../store/gameReducer"
import "./coin-flip.css"

const CoinFlip = () => {
    const gameObj = useSelector((state) => state.game)
    const dispatch = useDispatch()
    const [coinColor, setCoinColor] = useState(gameObj.teamOnePrimaryColor)
    const [coinColor2, setCoinColor2] = useState(gameObj.teamOneSecondaryColor)
    const [coinText, setCoinText] = useState(gameObj.teamOneName.slice(0, 1))
    const [message, setMessage] = useState("")
    const [flipped, setFlipped] = useState(false)
    const [ready, setReady] = useState("default")
    const flipCoin = () => {
        if (flipped) return
        setFlipped(true)
        let result
        const flip = () => {
            result = (Math.floor(Math.random() * 100) % 2)
            if (result) {
                setCoinColor(gameObj.teamTwoPrimaryColor)
                setCoinColor2(gameObj.teamTwoSecondaryColor)
                setCoinText(gameObj.teamTwoName.slice(0, 1))

            } else {
                setCoinColor(gameObj.teamOnePrimaryColor)
                setCoinColor2(gameObj.teamOneSecondaryColor)
                setCoinText(gameObj.teamOneName.slice(0, 1))
            }
        }
        let interval = setInterval(flip, 200)
        setTimeout(() => finish(), 3000)

        const finish = () => {
            clearInterval(interval)
            let direction
            let startingTeam
            if (result) {
                setMessage(`${gameObj.teamTwoName} will recieve the Kick Off, click to continue`)
                direction = "<--"
                startingTeam = 2
            } else {
                setMessage(`${gameObj.teamOneName} will recieve the Kick Off, click to continue`)
                direction = "-->"
                startingTeam = 1
            }
            let payload = { ...gameObj, direction, startingTeam }
            dispatch(updateGame(payload))
            setReady("pointer")
        }
    }

    const handleReady = () => {
        if (ready === "pointer") {
            let payload = { ...gameObj, gameAction: "kick-off" }
            dispatch(updateGame(payload))
        }
    }
    return (
        <div className="coin-flip-wrapper" onClick={handleReady} style={{ cursor: ready }}>
            <h2>Possession Coin Flip</h2>
            <div onClick={flipCoin} className="coin" style={{ backgroundColor: coinColor }}><span style={{ color: coinColor2 }}>{coinText}</span></div>
            {<div className="message">{message}</div>}
        </div>
    )
}

export default CoinFlip
