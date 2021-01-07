import range from 'lodash/range'
import React, { useState } from 'react'
import { LayoutChangeEvent, View } from 'react-native'
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerStateChangeEvent,
  State,
} from 'react-native-gesture-handler'

import { Gem, Grid } from '../game/Game'

type Gesture = {
  x: number
  y: number
  gridX: number
  gridY: number
  translationX: number
  translationY: number
}

interface Props {
  grid: Grid
  cols: number
  rows: number
}

export default function GameGrid({ grid, cols, rows }: Props) {
  const [size, setSize] = useState({ width: 0, height: 0 })
  const [gesture, setGesture] = useState<Gesture>()

  function handleLayout(event: LayoutChangeEvent) {
    const { width, height } = event.nativeEvent.layout
    setSize({ width, height })
  }

  function handleGestureEvent(event: PanGestureHandlerGestureEvent) {
    if (!gesture) return

    const { translationX, translationY } = event.nativeEvent
    const translationGridX =
      Math.sign(translationX) * Math.round(Math.abs(translationX) / (size.width / rows))
    const translationGridY =
      Math.sign(translationY) * Math.round(Math.abs(translationY) / (size.height / cols))
    if (gesture.translationX === 0 && gesture.translationY === 0) {
      if (translationGridX !== 0) {
        setGesture({
          ...gesture,
          translationY: 0,
          translationX: translationGridX * (size.width / rows),
        })
      } else if (translationGridY !== 0) {
        setGesture({
          ...gesture,
          translationX: 0,
          translationY: translationGridY * (size.height / cols),
        })
      }
    } else if (gesture.translationX === 0) {
      setGesture({
        ...gesture,
        translationX: 0,
        translationY: translationGridY * (size.height / cols),
      })
    } else if (gesture.translationY === 0) {
      setGesture({
        ...gesture,
        translationY: 0,
        translationX: translationGridX * (size.width / rows),
      })
    }
  }

  function handleHandlerStateChange(event: PanGestureHandlerStateChangeEvent) {
    const { state, x, y } = event.nativeEvent
    if (state === State.BEGAN) {
      const gridX = Math.floor(x / (size.width / rows))
      const gridY = Math.floor(y / (size.height / cols))
      setGesture({ x, y, gridX, gridY, translationX: 0, translationY: 0 })
    } else if (state === State.END) {
      setGesture(undefined)
    }
  }

  return (
    <PanGestureHandler
      onHandlerStateChange={handleHandlerStateChange}
      onGestureEvent={handleGestureEvent}
    >
      <View style={{ flex: 1, position: 'relative', overflow: 'hidden' }} onLayout={handleLayout}>
        {range(rows).map((x) =>
          range(cols).map((y) => {
            const width = size.width / rows
            const height = size.height / cols
            const left = x * width
            const top = y * height
            const translationX = (gesture?.gridY === y && gesture?.translationX) || 0
            const translationY = (gesture?.gridX === x && gesture?.translationY) || 0
            const isSelected = gesture?.gridX === x && gesture.gridY === y
            return (
              <React.Fragment key={`${x}-${y}`}>
                <View
                  style={{
                    padding: 1,
                    width,
                    height,
                    position: 'absolute',
                    left: left + translationX,
                    top: top + translationY,
                  }}
                >
                  <GridGem type={grid[x][y]} isSelected={isSelected} />
                </View>
                <View
                  style={{
                    padding: 1,
                    width,
                    height,
                    position: 'absolute',
                    left: left + size.width + translationX,
                    top: top + translationY,
                  }}
                >
                  <GridGem type={grid[x][y]} isSelected={isSelected} />
                </View>
                <View
                  style={{
                    padding: 1,
                    width,
                    height,
                    position: 'absolute',
                    left: left - size.width + translationX,
                    top: top + translationY,
                  }}
                >
                  <GridGem type={grid[x][y]} isSelected={isSelected} />
                </View>
                <View
                  style={{
                    padding: 1,
                    width,
                    height,
                    position: 'absolute',
                    left: left + translationX,
                    top: top + size.height + translationY,
                  }}
                >
                  <GridGem type={grid[x][y]} isSelected={isSelected} />
                </View>
                <View
                  style={{
                    padding: 1,
                    width,
                    height,
                    position: 'absolute',
                    left: left + translationX,
                    top: top - size.height + translationY,
                  }}
                >
                  <GridGem type={grid[x][y]} isSelected={isSelected} />
                </View>
              </React.Fragment>
            )
          }),
        )}
      </View>
    </PanGestureHandler>
  )
}

interface GridGemProps {
  type: Gem
  isSelected?: boolean
}

function GridGem({ type, isSelected }: GridGemProps) {
  let color = 'blue'
  switch (type) {
    case 'BLUE':
      color = 'blue'
      break
    case 'GREEN':
      color = 'green'
      break
    case 'RED':
      color = 'red'
      break
    case 'YELLOW':
      color = 'yellow'
      break
  }
  return (
    <View
      style={{
        backgroundColor: isSelected ? 'purple' : color,
        height: '100%',
        width: '100%',
      }}
    />
  )
}
