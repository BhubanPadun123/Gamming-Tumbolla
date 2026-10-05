import React, { useEffect } from 'react'
import { View } from 'react-native'
import { ActivityIndicator, Text } from 'react-native-paper'
import { Storage } from '../types/localStorage'
import ws from "../Websocket/websocket"

export default function SplashScreen({ navigation }: any) {
    useEffect(() => {
        const timer = setTimeout(async() => {
            const token = await Storage.getToken()
            if(token === null){
                navigation.replace("Login")
                return
            }
            if(!ws.isConnected()){
                ws.connect(token)
                ws.addCallbacks("AUTH",(data)=> {
                    console.log(data)
                })
            }
            navigation.replace('Home')
        }, 2000)

        return () => clearTimeout(timer)
    }, [navigation])

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <ActivityIndicator size="large" />
            <Text variant="headlineMedium" style={{ marginTop: 20 }}>
                WELCOME TO RAINBOW!
            </Text>
        </View>
    );
}