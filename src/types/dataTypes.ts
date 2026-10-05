export type userLoginPayloadType = {
    mobile_number: string
    password_hash: string
}

export type userRegistrationPayloadType = {
    id: string
    full_name: string
    email: string
    mobile_number: string
    password_hash: string
    avatar: string
    is_host: boolean
    is_active: boolean
}

export type userLoginResponseDataType = {
    access_token: string
    token_type: string
    user: userLoginResponseDataType
}

export interface ApiError {
    success: false;
    message: string;
    error_code?: string;
    data?: Record<string, string>;
}
export type gameRoomCreatePayload = {
    title:string
    description:string
    ticket_price:number
    max_players:number
    max_tickets_per_player:number
    game_type:string
    auto_call:boolean
    auto_call_interval:number
}
export type gameType = "FREE" | "PAID" | "PRIVATE"
export type gameRoomDataType = {
    room_code:string
    title:string
    description:string
    host_id:string
    ticket_price:number
    max_players:number
    max_tickets_per_player:number
    game_type:gameType
    auto_call:boolean
    auto_call_interval:number
    created_at?:string
    current_number?:number
    ended_at?:string
    id:number
    room_status:string
    started_at?:string
    updated_at?:string
}
export type deleteGameRoomPayload = {
    room_id:string | number
}
export type deleteGameRoomResponse = {
    message:string
}
export type TicketRow = [
  number, number, number,
  number, number, number,
  number, number, number
]
export type TicketData = [TicketRow, TicketRow, TicketRow]
export type allotatedTicketType = Record<string,number[]>
export type TicketFetchResponseType = {
    success:boolean
    room_id:string
    total_ticket:number
    generated_ticket:allotatedTicketType
    tickets:[TicketData]
    ticket_id?:number
}
export type PlayerBooksApiPayload = {
    room_code:string
    ticket_id:number
}
export type PlayerTicketRequestApiPayload = {
    room_code:string
    ticket_id:number
    ticket_allocation:number[]
    user_id:string
}
export type PlayerTicketRequestApiResponse = {
    created_at:string
    id:number
    room_code:string
    ticket_allocation:any
    ticket_id:number
}
export type TicketBookingRequestType = {
    tickets:number[]
    userId:string,
    room_code:string
}
export type PlayerTocketBookingRequest = {
    room_code:string
    tickets:number[]
    user_id:string
}
export type DeleteTicketBookingRequestType = {
    room_code:string
    user_id:string
    ticket_id:number
}