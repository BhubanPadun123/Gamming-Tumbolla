import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import {
   SplashScreen,
   HomeScreen,
   ProfileScreen,
   SettingsScreen,
   TransitionScreen,
   NestedTransitionScreen,
   ComingSoonScreen
} from '../Screen'
import {
   AddNewUser,
   CreateGameScreen,
   InviteCandidateScreen,
   LoginScreen,
   GameListScreen,
   GameRoomDashboard,
   TicketBoardScreen,
   PlayerGameList,
   HostTicketScreen,
   TicketBookingApprovalScreen
} from "../Screen/GameScreen/index"
import {
   LiveGameScreen
} from "../Screen/LiveGameScreen/index"

const Stack = createNativeStackNavigator()

function GameDashboard() {
   return (
      <Stack.Navigator screenOptions={{
         headerShown: false
      }}>
         <Stack.Screen
            name='GameList'
            component={GameListScreen}
         />
         <Stack.Screen
            name='GameRoomDashboard'
            component={GameRoomDashboard}
         />
         <Stack.Screen 
            name='TicketListScreen'
            component={HostTicketScreen}
         />
         <Stack.Screen 
            name='PlayerListScreen'
            component={TicketBookingApprovalScreen}
         />
      </Stack.Navigator>
   )
}
function TicktDashboard() {
   return (
      <Stack.Navigator screenOptions={{
         headerShown: false
      }}>
         <Stack.Screen
            name='PlaymerGameList'
            component={PlayerGameList}
         />
         <Stack.Screen
            name='TicketList'
            component={TicketBoardScreen}
         />
      </Stack.Navigator>
   )
}

export default function AppNavigator() {
   return (
      <Stack.Navigator
         initialRouteName="Splash"
         screenOptions={{
            headerShown: false,
         }}
      >
         <Stack.Screen
            name="Splash"
            component={SplashScreen}
         />

         <Stack.Screen
            name="Home"
            component={HomeScreen}
         />

         <Stack.Screen
            name="Profile"
            component={ProfileScreen}
         />

         <Stack.Screen
            name="Ticket"
            component={TicktDashboard}
         />
         <Stack.Screen
            name='Register'
            component={AddNewUser}
         />
         <Stack.Screen
            name='Committee'
            component={GameDashboard}
         />
         <Stack.Screen
            name='TransitionScreen'
            component={TransitionScreen}
         />
         <Stack.Screen
            name='NestedTransition'
            component={NestedTransitionScreen}
         />
         <Stack.Screen
            name='Update'
            component={GameDashboard}
         />

         <Stack.Screen
            name='Contact'
            component={ComingSoonScreen}
         />
         <Stack.Screen
            name='Notifications'
            component={ComingSoonScreen}
         />
         <Stack.Screen
            name='Login'
            component={LoginScreen}
         />
         <Stack.Screen
            name='Live'
            component={LiveGameScreen}
         />
         <Stack.Screen
            name='JointGroup'
            component={InviteCandidateScreen}
         />
         <Stack.Screen
            name='Create'
            component={CreateGameScreen}
         />
      </Stack.Navigator>
   )
}