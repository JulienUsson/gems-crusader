import React from 'react'
import { View } from 'react-native'

import GameGrid from '../components/GameGrid'
import GameState from '../components/GameState'

export default function GameScreen() {
  return (
    <View style={{ flex: 1 }}>
      <GameState />
      <GameGrid />
    </View>
  )
}
