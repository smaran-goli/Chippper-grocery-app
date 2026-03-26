import { View, Text, SafeAreaView, Image } from 'react-native'
import React from 'react'
import logo from '../assets/logo.png'
import chipper from '../assets/chipper.png'
import slogan from '../assets/slogan.png'

export default function SplashScreen() {
  return (
    <View style={{alignItems: 'center' }}>
      <Image source={logo} style={{ width: 190, height: 170, top: 180 }} />
      <Image source={chipper} style={{ top: 200 }} />
      <Image source={slogan} style={{ top: 220 }} />
    </View>
  )
}