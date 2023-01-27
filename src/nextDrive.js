

const nextDrive = (gameObj) => {
    let changes = {}
    if (gameObj.quarter === "OT" && gameObj.drive === 2) {
        if (gameObj.teamOneScore === gameObj.teamTwoScore) {
            changes.drive = 1
        } else {
            changes.gameAction = "full-time"
        }
    } else if (gameObj.drive === "-") {
        changes.drive = 1
    } else if (gameObj.quarter === 1 && gameObj.drive === gameObj.totalPossessions) {
        changes.quarter = 2
        changes.drive = 1
    } else if (gameObj.quarter === 2 && gameObj.drive === gameObj.totalPossessions) {
        changes.quarter = 3
        changes.drive = 1
        changes.gameAction = "half-time"
    } else if (gameObj.quarter === 3 && gameObj.drive === gameObj.totalPossessions) {
        changes.quarter = 4
        changes.drive = 1
    } else if (gameObj.quarter === 4 && gameObj.drive === gameObj.totalPossessions) {
        if (gameObj.teamOneScore === gameObj.teamTwoScore) {
            changes.quarter = "OT"
            changes.drive = 1
            changes.gameAction = "over-time"
        } else {
            changes.gameAction = "full-time"
        }
    } else {
        changes.drive = gameObj.drive + 1
    }

    return changes
}

export default nextDrive
