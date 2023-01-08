import "./field.css"

const Field = () => {
    return (
        <div className="field-wrapper">
            <div className="end-zone-1"><div>Team One</div></div>
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
            <div className="end-zone-2"><div>Team Two</div></div>
        </div>
    )
}

export default Field
