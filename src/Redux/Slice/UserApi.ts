import {baseQuery,service_path} from "../constant"
import { createApi } from "@reduxjs/toolkit/query/react"
import {
    userLoginPayloadType,
    userLoginResponseDataType,
    ApiError
} from "../../types/dataTypes"

export const userApi =createApi({
    reducerPath:"userApi",
    baseQuery,
    tagTypes:["User"],
    endpoints:(builder)=> ({
        userLogin:builder.mutation<userLoginResponseDataType,userLoginPayloadType>({
            query:(body)=> ({
                url:`${service_path.user}/auth/login`,
                method:"POST",
                body
            })
        })
    })
})

export const {
    useUserLoginMutation
} = userApi

export default userApi