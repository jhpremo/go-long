import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { updateGame } from "../../store/gameReducer"
import Field from "../Field"
import "./main-menu.css"

const MainMenu = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [toggleMainMenu, setToggleMainMenu] = useState(true)
    const [teamOneName, setTeamOneName] = useState('Red Wolves')
    const [teamOnePrimaryColor, setTeamOnePrimaryColor] = useState('#FF2708')
    const [teamOneSecondaryColor, setTeamOneSecondaryColor] = useState('#FFFFFF')
    const [teamTwoName, setTeamTwoName] = useState('Blue Birds')
    const [teamTwoPrimaryColor, setTeamTwoPrimaryColor] = useState('#0101FD')
    const [teamTwoSecondaryColor, setTeamTwoSecondaryColor] = useState('#FFFFFF')
    const [totalPossessions, setTotalPossessions] = useState(4)
    const [existingGame, setExistingGame] = useState(false)

    useEffect(() => {
        let game = localStorage.getItem("gameObj")
        if (game) {
            setExistingGame(true)
        }
    }, [])

    useEffect(() => {
        let payload = {
            teamOneName,
            teamOnePrimaryColor,
            teamOneSecondaryColor,
            teamTwoName,
            teamTwoPrimaryColor,
            teamTwoSecondaryColor,
            totalPossessions
        }
        dispatch(updateGame(payload))
    }, [teamOneName, teamOnePrimaryColor, teamOneSecondaryColor, teamTwoName, teamTwoPrimaryColor, teamTwoSecondaryColor, totalPossessions, dispatch])

    const handleStart = () => {
        let payload = {
            teamOneName,
            teamOnePrimaryColor,
            teamOneSecondaryColor,
            teamTwoName,
            teamTwoPrimaryColor,
            teamTwoSecondaryColor,
            totalPossessions: Number(totalPossessions),
            gameAction: "coin-flip",
            teamOneScore: 0,
            teamTwoScore: 0,
            quarter: 1,
            down: "-",
            toGo: "-",
            ballOn: "-",
            direction: "-",
            drive: "-"
        }
        dispatch(updateGame(payload))
        navigate("/game")
    }

    const handleResume = () => {
        let payload = JSON.parse(localStorage.getItem("gameObj"))
        console.log(payload)
        dispatch(updateGame(payload))
        navigate("/game")
    }

    return (
        <div className="main-menu-wrapper">
            <div className="main-menu-top-half">
                {toggleMainMenu && <h1 className="main-menu-title">Go Long</h1>}
                {toggleMainMenu && <div className="main-menu-button-container">
                    <button onClick={() => setToggleMainMenu(false)} className="main-menu-button">New Game</button>
                    {existingGame && <button className="main-menu-button" onClick={handleResume}>Resume</button>}
                </div>}
                {!toggleMainMenu && <div className="team-select-wrapper">
                    <button onClick={() => setToggleMainMenu(true)} className="back-button"><i className="fa-solid fa-arrow-left" /></button>
                    <div className="team-select-options-wrapper">
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
                    <div className="game-options-wrapper">
                        <h2>Game Options</h2>
                        <div className="team-select-input-wrapper">
                            <label>Possessions per Quarter: {totalPossessions}</label>
                            <input className="slider" type="range" min={1} max={8} value={totalPossessions} onChange={(e) => setTotalPossessions(e.target.value)} ></input>
                        </div>
                        <button className="main-menu-button" id="start-game-button" onClick={handleStart}>Start Game</button>
                    </div>
                    <div className="team-select-options-wrapper">
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
