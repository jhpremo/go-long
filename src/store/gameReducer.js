const UPDATEGAME = 'UPDATE/GAME'

export const updateGame = (gameObj) => {
    return {
        type: UPDATEGAME,
        gameObj
    }
}

export default function gameReducer(state = {}, action) {
    switch (action.type) {
        case UPDATEGAME:
            let newState = { ...action.gameObj }
            return newState
        default:
            return state;
    }
}
