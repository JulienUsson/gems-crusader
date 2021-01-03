import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { THREE } from 'expo-three'
import React from 'react'

import GameScreen from './src/screens/GameScreen'
import HomeScreen from './src/screens/HomeScreen'

global.THREE = global.THREE || THREE

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="Game">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
