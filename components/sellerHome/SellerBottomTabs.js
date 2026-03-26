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
      <Icon icon="home" text="Home" navigation={navigation} pageName='BuyerSell' />
      <Icon icon="plus-circle" text="Add Items" navigation={navigation} pageName='addGroceryItems' />
      <Icon icon="user" text="Account" navigation={navigation} pageName='Profile' />
    </View>
  );
}

const Icon = (props) => (
  <TouchableOpacity
  onPress={() => {props.navigation.navigate(props.pageName, {whichProfile: 'seller'})}}
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