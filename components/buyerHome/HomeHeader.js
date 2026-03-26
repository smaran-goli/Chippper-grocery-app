import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { firebase } from "../../config";
import logo from "../../assets/logo-removebg.png";
import { useNavigation } from "@react-navigation/native";

export default function HomeHeader(props) {
  const navigation = useNavigation();
  const [name, setName] = useState([]);

  useEffect(() => {
    firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).get()
    .then((snapshot) =>{
      if(snapshot.exists){
          setName(snapshot.data())
      }
      else {
        console.log('does not exist')
      }
  })
  }, [])

  return (
    <View>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          paddingTop: "3%",
          backgroundColor: "#fff",
          paddingBottom: '3%'
        }}
        onPress={() => navigation.navigate("BuyerHome")}
      >
        <Image
          source={logo}
          style={{ width: 35, height: 35, marginRight: "2%" }}
        />
        <Text style={{ fontWeight: "bold", fontSize: 24 }}>Chipper</Text>
      </TouchableOpacity>
      <Text
        style={{
          fontFamily: "Roboto",
          marginLeft: "5%",
          fontSize: 32,
          marginTop: "3%",
        }}
      >
        Welcome, {name.firstName}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingLeft: "4%",
          paddingTop: "1%",
        }}
      >
        <Ionicons
          name="location-sharp"
          size={24}
          style={{ color: "#B2B2B2" }}
        />
        <Text style={{ fontFamily: "Roboto", fontSize: 18, color: "#B2B2B2" }}>
          {props.cityLocation}
        </Text>
      </View>
    </View>
  );
}
