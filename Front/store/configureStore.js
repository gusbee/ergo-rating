import { createStore, combineReducers } from "redux";
import profileReducer from "./reducers/profileReducer";
import observationReducer from "./reducers/observationReducer";

const rootReducer = combineReducers({
    profileReducer,
    observationReducer
})

export default createStore(rootReducer);