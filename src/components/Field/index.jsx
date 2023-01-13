import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import "./field.css"

const Field = () => {
    const gameObj = useSelector((state) => state.game)
    const [toggleFirstDown, setToggleFirstDown] = useState("no-first-down")
    const [toggleFootball, setToggleFootball] = useState("no-first-down")
    const [firstDown, setFirstDown] = useState(0)
    useEffect(() => {
        if (!gameObj.ballOn || gameObj.ballOn === "-") {
            setToggleFirstDown("no-first-down")
            setToggleFootball("no-first-down")
        } else {
            setToggleFirstDown('first-down')
            setToggleFootball('football')
            if (gameObj.direction === "-->") {
                setFirstDown(gameObj.ballOn + gameObj.toGo)
            } else if (gameObj.direction === "<--") {
                setFirstDown(gameObj.ballOn - gameObj.toGo)
            }
        }
    }, [gameObj.ballOn, gameObj.toGo, gameObj.direction])
    return (
        <div className="field-wrapper">
            <div className="end-zone-1" style={{ backgroundColor: gameObj.teamOnePrimaryColor }}><div style={{ color: gameObj.teamOneSecondaryColor }}>{gameObj.teamOneName}</div></div>
            <div className="field-body">
                <div className={toggleFirstDown} style={{ left: `${firstDown}%` }}></div>
                <div className={toggleFootball} style={{ left: `${gameObj.ballOn - 2.5}%` }}></div>
                <div className="ten-yard" id="first"></div>
                <div className="ten-yard"></div>
                <div className="ten-yard"></div>
                <div className="ten-yard"></div>
                <div className="ten-yard" id="fifty-yard"></div>
                <div className="ten-yard"></div>
                <div className="ten-yard"></div>
                <div className="ten-yard"></div>
                <div className="ten-yard" id="last"></div>
            </div>
            <div className="end-zone-2" style={{ backgroundColor: gameObj.teamTwoPrimaryColor }}><div style={{ color: gameObj.teamTwoSecondaryColor }}>{gameObj.teamTwoName}</div></div>
        </div>
    )
}

export default Field
