// Etat initial
const initialState = {
}

function handleObservation(state = initialState, action) {
    let nextState;
    switch (action.type) {
        case "HANDLE_OBSERVATION":
            nextState = {
                ...state,
                ...action.value,
            }
            console.log("nextState : ", nextState)
            return nextState || state;
            break;
        default:
            return state;
    }
}

export default handleObservation;