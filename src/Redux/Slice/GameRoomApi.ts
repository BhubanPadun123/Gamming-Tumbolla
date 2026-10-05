import {baseQuery,service_path} from "../constant"
import { createApi } from "@reduxjs/toolkit/query/react"
import {
    gameRoomCreatePayload,
    gameRoomDataType,
    deleteGameRoomPayload,
    deleteGameRoomResponse,
    TicketFetchResponseType,
    PlayerBooksApiPayload,
    PlayerTicketRequestApiPayload,
    PlayerTicketRequestApiResponse,
    PlayerTocketBookingRequest,
    DeleteTicketBookingRequestType
} from "../../types/dataTypes"


export const gameRoomApi = createApi({
    reducerPath:"gameRoom",
    baseQuery,
    tagTypes:["game"],
    endpoints:(builder)=> ({
        createGameRoom:builder.mutation<gameRoomDataType,gameRoomCreatePayload>({
            query:(data)=> ({
                url:`${service_path.game}/rooms`,
                method:"POST",
                body:data
            })
        }),
        allGameRooms:builder.query<gameRoomDataType[],string>({
            query:(id)=> ({
                url:`${service_path.game}/${id}`,
                method:"GET"
            })
        }),
        platformAllGameRoom:builder.query<{count:number,data:gameRoomDataType[]},null>({
            query:()=> ({
                url:`${service_path.game}/rooms`,
                method:"GET"
            })
        }),
        deleteGameRoom:builder.mutation<deleteGameRoomResponse,deleteGameRoomPayload>({
            query:(room_id)=> ( {
                url:`${service_path.game}/rooms/${room_id.room_id}`,
                method:"DELETE",
                body:{
                    room_id:room_id.room_id
                }
            })
        }),
        getGameTickets:builder.query<TicketFetchResponseType,string>({
            query:(room_code)=> ({
                url:`${service_path.game}/rooms/ticket/${room_code}`,
                method:"GET"
            })
        }),
        getPlayerTicketBooking:builder.query<{data:PlayerTicketRequestApiResponse[]},PlayerBooksApiPayload>({
            query:({
                room_code,
                ticket_id
            })=> ({
                url:`${service_path.game}/rooms/player/book/${room_code}/${ticket_id}`,
                method:"GET"
            })
        }),
        playerTicketBook:builder.mutation<any,PlayerTicketRequestApiPayload>({
            query:(body)=> ({
                url:`${service_path.game}/rooms/ticket/book/player`,
                method:"POST",
                body:body
            })
        }),
        approvePlayerTGicket:builder.mutation<any,PlayerTocketBookingRequest>({
            query:({
                user_id,
                room_code,
                tickets
            })=> ({
                url:`${service_path.game}/rooms/booking_ticket`,
                method:"POST",
                body:{
                    user_id,
                    room_code,
                    tickets
                }
            })
        }),
        deletePlayerRequestTicket:builder.mutation<any,DeleteTicketBookingRequestType>({
            query:({
                ticket_id,
                user_id,
                room_code
            })=> ({
                url:`${service_path.game}/rooms/remove/booking_ticket`,
                method:"DELETE",
                body:{
                    ticket_id,
                    user_id,
                    room_code
                }
            })
        })
    })
})

export const {
    useCreateGameRoomMutation,
    useLazyAllGameRoomsQuery,
    useLazyPlatformAllGameRoomQuery,
    useDeleteGameRoomMutation,
    
    useLazyGetGameTicketsQuery,
    useLazyGetPlayerTicketBookingQuery,
    usePlayerTicketBookMutation,

    useApprovePlayerTGicketMutation,
    useDeletePlayerRequestTicketMutation
} = gameRoomApi

export default gameRoomApi