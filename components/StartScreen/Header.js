import { View, Text, Image } from 'react-native'
import React from 'react'
import logoNoBackground from '../../assets/logo-removebg.png'

const Header = (props) => {
  return (
    <View style={{ marginLeft: 15, backgroundColor: '#000', flexDirection: 'row', alignItems: 'center', textAlign: 'center', justifyContent: 'center' }}>
      <Image
        style={{ width: 50, height: 50, marginRight: 20, alignItems: 'center' }}
        source={logoNoBackground}
      />
      <Text style={{ fontWeight: 'bold', fontSize: 28, color: '#fff', alignItems: 'center', textAlign: 'center' }}>
        {props.name}
      </Text>
    </View>
  )
}

export default Header