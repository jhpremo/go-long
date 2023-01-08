import Field from "../Field"
import "./main-menu.css"

const MainMenu = () => {
    return (
        <div className="main-menu-wrapper">
            <div className="main-menu-top-half">
                <h1 className="main-menu-title">Go Long</h1>
                <div className="main-menu-button-container">
                    <button className="main-menu-button">New Game</button>
                    <button className="main-menu-button">Resume</button>
                    <button className="main-menu-button">Options</button>
                </div>
            </div>
            <div className="main-menu-bottom-half">
                <Field />
            </div>
        </div>
    )
}

export default MainMenu
