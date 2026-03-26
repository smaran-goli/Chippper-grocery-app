import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function BuyerBottomTabs({navigation}) {
  return (
    <View
      style={{
        flexDirection: "row",
        margin: 10,
        marginHorizontal: 30,
        justifyContent: "space-between",
      }}
    > 
      <Icon icon="home" text="Home" navigation={navigation} pageName='BuyerHome'/>
      <Icon icon="search" text="Browse" navigation={navigation} pageName='search'/>
      <Icon icon="facebook-messenger" text="Message" navigation={navigation} pageName='message'/>
      <Icon icon="robot" text="ChatBot" navigation={navigation} pageName='chatbot'/>
      <Icon icon="shopping-bag" text="Grocery" navigation={navigation} pageName='grocery'/>
      <Icon icon="user" text="Account" navigation={navigation} pageName='Profile'/>
    </View>
  );
}

const Icon = (props) => (
  <TouchableOpacity
  onPress={() => {props.navigation.navigate(props.pageName, {whichProfile: 'buyer'})}}
  >
    <View>
      <FontAwesome5
        name={props.icon}
        size={25}
        style={{
          marginBottom: 3,
          alignSelf: "center",
        }}
      />
      <Text>{props.text}</Text>
    </View>
  </TouchableOpacity>
);