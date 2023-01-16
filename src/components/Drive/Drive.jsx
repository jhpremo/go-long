import "./drive.css"

const Drive = () => {
    return (
        <div className="drive-wrapper">
            <div className="dice-wrapper">
                <div className="option-wrapper">
                    <div className="re-roll"><i className="fa-solid fa-rotate-right" /></div>
                    <button><i className="fa-solid fa-rotate-right" />Roll</button>
                </div>
                <div className="option-wrapper">
                    <div className="white-die"></div>
                    <button>Take Play</button>
                </div>
                <div className="option-wrapper">
                    <div className="blue-die"></div>
                    <button>Take Play</button>
                </div>
                <div className="option-wrapper">
                    <div className="green-die"></div>
                    <button>Take Play</button>
                </div>
                <div className="option-wrapper">
                    <div className="green-die"></div>
                    <button>Take Play</button>
                </div>
                <div className="option-wrapper">
                    <div className="green-die"></div>
                    <button>Take Play</button>
                </div>
            </div>
        </div>
    )
}

export default Drive
