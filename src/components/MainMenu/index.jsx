import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { updateGame } from "../../store/gameReducer"
import Field from "../Field"
import "./main-menu.css"

const MainMenu = () => {
    const dispatch = useDispatch()
    const [toggleMainMenu, setToggleMainMenu] = useState(true)
    const [teamOneName, setTeamOneName] = useState('Red Wolves')
    const [teamOnePrimaryColor, setTeamOnePrimaryColor] = useState('#FF2708')
    const [teamOneSecondaryColor, setTeamOneSecondaryColor] = useState('#FFFFFF')
    const [teamTwoName, setTeamTwoName] = useState('Blue Birds')
    const [teamTwoPrimaryColor, setTeamTwoPrimaryColor] = useState('#0101FD')
    const [teamTwoSecondaryColor, setTeamTwoSecondaryColor] = useState('#FFFFFF')

    useEffect(() => {
        let payload = {
            teamOneName,
            teamOnePrimaryColor,
            teamOneSecondaryColor,
            teamTwoName,
            teamTwoPrimaryColor,
            teamTwoSecondaryColor
        }
        dispatch(updateGame(payload))
    }, [teamOneName, teamOnePrimaryColor, teamOneSecondaryColor, teamTwoName, teamTwoPrimaryColor, teamTwoSecondaryColor, dispatch])
    return (
        <div className="main-menu-wrapper">
            <div className="main-menu-top-half">
                {toggleMainMenu && <h1 className="main-menu-title">Go Long</h1>}
                {toggleMainMenu && <div className="main-menu-button-container">
                    <button onClick={() => setToggleMainMenu(false)} className="main-menu-button">New Game</button>
                    <button className="main-menu-button">Resume</button>
                    <button className="main-menu-button">Options</button>
                </div>}
                {!toggleMainMenu && <div className="team-select-wrapper">
                    <div className="team-select-one-wrapper">
                        <h2>Player One</h2>
                        <div className="team-select-input-wrapper">
                            <label>Team Name</label>
                            <input type="text" value={teamOneName} onChange={(e) => setTeamOneName(e.target.value)} ></input>
                        </div>
                        <div className="team-select-color-input-wrapper">
                            <div className="team-select-input-wrapper" >
                                <label>Primary Color</label>
                                <input type="color" value={teamOnePrimaryColor} onChange={(e) => setTeamOnePrimaryColor(e.target.value)} ></input>
                            </div>
                            <div className="team-select-input-wrapper">
                                <label>Secondary Color</label>
                                <input type="color" value={teamOneSecondaryColor} onChange={(e) => setTeamOneSecondaryColor(e.target.value)} ></input>
                            </div>
                        </div>
                        <div className="team-select-input-wrapper">
                        </div>
                    </div>
                    <div className="team-select-two-wrapper">
                        <h2>Player Two</h2>
                        <div className="team-select-input-wrapper">
                            <label>Team Name</label>
                            <input type="text" value={teamTwoName} onChange={(e) => setTeamTwoName(e.target.value)} ></input>
                        </div>
                        <div className="team-select-color-input-wrapper">
                            <div className="team-select-input-wrapper" >
                                <label>Primary Color</label>
                                <input type="color" value={teamTwoPrimaryColor} onChange={(e) => setTeamTwoPrimaryColor(e.target.value)} ></input>
                            </div>
                            <div className="team-select-input-wrapper">
                                <label>Secondary Color</label>
                                <input type="color" value={teamTwoSecondaryColor} onChange={(e) => setTeamTwoSecondaryColor(e.target.value)} ></input>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
            <div className="main-menu-bottom-half">
                <Field />
            </div>
        </div>
    )
}

export default MainMenu
