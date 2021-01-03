import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, TouchableHighlight, View } from 'react-native'

export default function HomeScreen() {
  const navigation = useNavigation()

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableHighlight onPress={() => navigation.navigate('Game')}>
        <Text>Play</Text>
      </TouchableHighlight>
    </View>
  )
}
