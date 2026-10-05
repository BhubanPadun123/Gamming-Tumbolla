import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
    gameRoomCreatePayload,
    TicketBookingRequestType
} from "../../types/dataTypes"

interface GameState {
    roomId: number | null;
    roomCode: string;
    gameStarted: boolean;
    formState: gameRoomCreatePayload
    ticketRequest:TicketBookingRequestType[]
}

const initialState: GameState = {
    roomId: null,
    roomCode: "",
    gameStarted: false,
    ticketRequest:[],
    formState: {
        title:"",
        description:"",
        ticket_price:0,
        max_tickets_per_player:0,
        game_type:"",
        auto_call_interval:5,
        auto_call:true,
        max_players:250
    }
}

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        setRoom(
            state,
            action: PayloadAction<{
                roomId: number;
                roomCode: string;
            }>
        ) {
            state.roomId = action.payload.roomId;
            state.roomCode = action.payload.roomCode;
        },

        startGame(state) {
            state.gameStarted = true;
        },

        endGame(state) {
            state.gameStarted = false;
            state.roomId = null;
            state.roomCode = "";
        },
        formFill(state,action:PayloadAction<{
            fieldName:"title" | "description" | "ticket_price" | "max_players" | "max_tickets_per_player" | "game_type" | "auto_call" | "auto_call_interval"
            fieldValue:string | number
        }>){
            state.formState = {
                ...state.formState,
                [action.payload.fieldName]:action.payload.fieldValue
            }
        },
        wsTicketRequestResponse(state,action:PayloadAction<TicketBookingRequestType>){
            state.ticketRequest.push(action.payload)
        }
    },
});

export const { setRoom, startGame, endGame,formFill,wsTicketRequestResponse } = gameSlice.actions;

export default gameSlice.reducer