import range from 'lodash/range'
import React, { useState } from 'react'
import { LayoutChangeEvent, View } from 'react-native'
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerStateChangeEvent,
  State,
} from 'react-native-gesture-handler'

const ROW_COUNT = 8
const COL_COUNT = 6

type Gesture = {
  x: number
  y: number
  gridX: number
  gridY: number
  translationX: number
  translationY: number
}

export default function GameGrid() {
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
      Math.sign(translationX) * Math.round(Math.abs(translationX) / (size.width / ROW_COUNT))
    const translationGridY =
      Math.sign(translationY) * Math.round(Math.abs(translationY) / (size.height / COL_COUNT))
    if (gesture.translationX === 0 && gesture.translationY === 0) {
      if (translationGridX !== 0) {
        setGesture({
          ...gesture,
          translationY: 0,
          translationX: translationGridX * (size.width / ROW_COUNT),
        })
      } else if (translationGridY !== 0) {
        setGesture({
          ...gesture,
          translationX: 0,
          translationY: translationGridY * (size.height / COL_COUNT),
        })
      }
    } else if (gesture.translationX === 0) {
      setGesture({
        ...gesture,
        translationX: 0,
        translationY: translationGridY * (size.height / COL_COUNT),
      })
    } else if (gesture.translationY === 0) {
      setGesture({
        ...gesture,
        translationY: 0,
        translationX: translationGridX * (size.width / ROW_COUNT),
      })
    }
  }

  function handleHandlerStateChange(event: PanGestureHandlerStateChangeEvent) {
    const { state, x, y } = event.nativeEvent
    if (state === State.BEGAN) {
      const gridX = Math.floor(x / (size.width / ROW_COUNT))
      const gridY = Math.floor(y / (size.height / COL_COUNT))
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
        {range(ROW_COUNT).map((x) =>
          range(COL_COUNT).map((y) => {
            const width = size.width / ROW_COUNT
            const height = size.height / COL_COUNT
            const left = x * width
            const top = y * height
            const translationX = (gesture?.gridY === y && gesture?.translationX) || 0
            const translationY = (gesture?.gridX === x && gesture?.translationY) || 0
            const isSelected = gesture?.gridX === x && gesture.gridY === y
            return (
              <View
                key={`${x}-${y}`}
                style={{
                  padding: 1,
                  width,
                  height,
                  position: 'absolute',
                  left: left + translationX,
                  top: top + translationY,
                }}
              >
                <View
                  style={{
                    backgroundColor: isSelected ? 'blue' : 'red',
                    height: '100%',
                    width: '100%',
                  }}
                />
              </View>
            )
          }),
        )}
      </View>
    </PanGestureHandler>
  )
}
