import { fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Storage } from "../types/localStorage"

export const BASE_URL = "http://192.168.1.17:8000/"

export const service_path = {
    "user":"/api/rainbow/auth",
    "game":"/api/rainbow/game",
    "ws": "api/rainbow/websocket"
}

export const WS_BASE_URL = BASE_URL
    .replace("http://", "ws://")
    .replace("https://", "wss://")

export const baseQuery = fetchBaseQuery({
    baseUrl:BASE_URL,
    prepareHeaders: async(headers)=> {
        const token = await Storage.getToken()
        if(token){
            headers.set("Authorization", `Bearer ${token}`)
        }
        headers.set("Content-Type", "application/json")
        return headers
    }
})