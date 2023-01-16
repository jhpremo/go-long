import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import CoinFlip from "../CoinFlip"
import Drive from "../Drive/Drive"
import Field from "../Field"
import KickOff from "../KickOff"
import "./game.css"

const Game = () => {
    const navigate = useNavigate()
    const gameObj = useSelector((state) => state.game)
    const [ballOn, setBallOn] = useState("-")

    useEffect(() => {
        if (!gameObj?.teamOnePrimaryColor) navigate("/")
    }, [])

    useEffect(() => {
        if (gameObj.ballOn === "-") setBallOn('-')
        else if (gameObj.ballOn > 50) setBallOn(100 - gameObj.ballOn)
        else {
            setBallOn(gameObj.ballOn)
        }
    }, [gameObj.ballOn])
    return (
        <div className="game-wrapper">
            <div className="game-top-wrapper">
                <div className="score-board-wrapper">
                    <div className="score-board-row">
                        <div className="score-board-section">
                            <label className="score-board-label">Team One</label>
                            <div className="score-board-content">{gameObj.teamOneScore}</div>
                        </div>
                        <div className="score-board-section">
                            <label className="score-board-label">Quarter</label>
                            <div className="score-board-content">{gameObj.quarter}</div>
                        </div>
                        <div className="score-board-section">
                            <label className="score-board-label">Drive</label>
                            <div className="score-board-content">{gameObj.drive}</div>
                        </div>
                        <div className="score-board-section">
                            <label className="score-board-label">Team Two</label>
                            <div className="score-board-content">{gameObj.teamTwoScore}</div>
                        </div>
                    </div>
                    <div className="score-board-row">
                        <div className="score-board-section">
                            <label className="score-board-label">Down</label>
                            <div className="score-board-content">{gameObj.down}</div>
                        </div>
                        <div className="score-board-section">
                            <label className="score-board-label">To Go</label>
                            <div className="score-board-content">{gameObj.toGo}</div>
                        </div>
                        <div className="score-board-section">
                            <label className="score-board-label">Ball On</label>
                            <div className="score-board-content">{ballOn}</div>
                        </div>
                        <div className="score-board-section">
                            <label className="score-board-label">Direction</label>
                            <div className="score-board-content">{gameObj.direction}</div>
                        </div>
                    </div>
                </div>
                <div className="gameplay-wrapper">
                    {gameObj.gameAction === "coin-flip" && <CoinFlip />}
                    {gameObj.gameAction === "kick-off" && <KickOff />}
                    {gameObj.gameAction === "drive" && <Drive />}
                </div>
            </div>
            <div className="game-bottom-wrapper">
                <Field />
            </div>
        </div>
    )
}

export default Game
