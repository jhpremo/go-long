import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import "./field.css"

const Field = () => {
    const gameObj = useSelector((state) => state.game)
    const [toggleFirstDown, setToggleFirstDown] = useState("no-first-down")
    const [toggleFootball, setToggleFootball] = useState("no-first-down")
    const [toggleBlueLine, setToggleBlueLine] = useState("no-first-down")
    const [firstDown, setFirstDown] = useState(0)
    useEffect(() => {
        if ((!gameObj.ballOn && gameObj.ballOn !== 0) || gameObj.ballOn === "-") {
            setToggleFirstDown("no-first-down")
            setToggleFootball("no-first-down")
            setToggleBlueLine("no-first-down")
        } else {
            if (gameObj.ballOn >= 100 || gameObj.ballOn <= 0) {
                setToggleFirstDown('no-first-down')
                setToggleBlueLine("no-first-down")
            } else {
                if (gameObj.toGo === "-") setToggleFirstDown('no-first-down')
                else setToggleFirstDown('first-down')
                setToggleBlueLine("blue-line")
            }
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
                <div className={toggleFirstDown} style={{ left: `${firstDown - 0.5}%` }}></div>
                <div className={toggleFootball} style={{ left: `${gameObj.ballOn - 2.5}%` }}></div>
                <div className={toggleBlueLine} style={{ left: `${gameObj.ballOn - 0.5}%` }}></div>
                <div className="ten-yard" id="first"></div>
                <div className="field-number-top" style={{ left: "7%" }}>1 0</div>
                <div className="field-number-bottom" style={{ left: "7%" }}>1 0</div>
                <div className="ten-yard"></div>
                <div className="field-number-top" style={{ left: "17%" }}>2 0</div>
                <div className="field-number-bottom" style={{ left: "17%" }}>2 0</div>
                <div className="ten-yard"></div>
                <div className="field-number-top" style={{ left: "27%" }}>3 0</div>
                <div className="field-number-bottom" style={{ left: "27%" }}>3 0</div>
                <div className="ten-yard"></div>
                <div className="field-number-top" style={{ left: "37%" }}>4 0</div>
                <div className="field-number-bottom" style={{ left: "37%" }}>4 0</div>
                <div className="ten-yard" id="fifty-yard"></div>
                <div className="field-number-top" style={{ left: "47%" }}>5</div>
                <div className="field-number-bottom" style={{ left: "47%" }}>5</div>
                <div className="field-number-top" style={{ left: "51%" }}>0</div>
                <div className="field-number-bottom" style={{ left: "51%" }}>0</div>
                <div className="ten-yard"></div>
                <div className="field-number-top" style={{ left: "57.5%" }}>4 0</div>
                <div className="field-number-bottom" style={{ left: "57.5%" }}>4 0</div>
                <div className="ten-yard"></div>
                <div className="field-number-top" style={{ left: "67.5%" }}>3 0</div>
                <div className="field-number-bottom" style={{ left: "67.5%" }}>3 0</div>
                <div className="ten-yard"></div>
                <div className="field-number-top" style={{ left: "77.5%" }}>2 0</div>
                <div className="field-number-bottom" style={{ left: "77.5%" }}>2 0</div>
                <div className="ten-yard" id="last"></div>
                <div className="field-number-top" style={{ left: "87.5%" }}>1 0</div>
                <div className="field-number-bottom" style={{ left: "87.5%" }}>1 0</div>
            </div>
            <div className="end-zone-2" style={{ backgroundColor: gameObj.teamTwoPrimaryColor }}><div style={{ color: gameObj.teamTwoSecondaryColor }}>{gameObj.teamTwoName}</div></div>
        </div>
    )
}

export default Field
