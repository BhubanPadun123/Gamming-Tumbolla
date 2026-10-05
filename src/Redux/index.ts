import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./Slice/UserApi"
import gameRoomApi from "./Slice/GameRoomApi"
import authReducer from "./Slice/authSlice"
import gameReducer from "./Slice/gameSlice"

export const store = configureStore({
  reducer:{
    auth:authReducer,
    game:gameReducer,
    [userReducer.reducerPath]: userReducer.reducer,
    [gameRoomApi.reducerPath]: gameRoomApi.reducer,
  },
  middleware: (getDefaultMiddleware)=> 
    getDefaultMiddleware({
      serializableCheck:false
    }).concat(
      userReducer.middleware
    ).concat(
      gameRoomApi.middleware
    )
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch