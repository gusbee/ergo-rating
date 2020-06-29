const initialState = {
    companyName: "",
    numberOfEmployees: "",
    userId: null,
}

function handleProfile(state = initialState, action) {
    let nextState;
    switch (action.type) {
        case "HANDLE_PROFILE":
            nextState = {
                ...state,
                ...action.value,
            }
            return nextState || state;
            break;
        default:
            return state;
    }
}

export default handleProfile;