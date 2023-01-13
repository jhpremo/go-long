import { useSelector } from "react-redux"
import "./field.css"

const Field = () => {
    const gameObj = useSelector((state) => state.game)
    return (
        <div className="field-wrapper">
            <div className="end-zone-1" style={{ backgroundColor: gameObj.teamOnePrimaryColor }}><div style={{ color: gameObj.teamOneSecondaryColor }}>{gameObj.teamOneName}</div></div>
            <div className="field-body">
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
