import { combineReducers } from "@reduxjs/toolkit"

import authReducer from "./Slice/authSlice"
import gameReducer from "./Slice/gameSlice"

const rootReducer = combineReducers({
    auth: authReducer,
    game: gameReducer,
})

export default rootReducer