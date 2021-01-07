import React, { useState } from 'react'
import { View } from 'react-native'

import GameGrid from '../components/GameGrid'
import GameState from '../components/GameState'
import Game from '../game/Game'

export default function GameScreen() {
  const [game, setGame] = useState(() => new Game(6, 8))

  return (
    <View style={{ flex: 1 }}>
      <GameState />
      <GameGrid cols={game.cols} rows={game.rows} grid={game.grid} />
    </View>
  )
}
